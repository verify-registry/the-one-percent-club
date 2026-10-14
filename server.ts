import express from "express";
import type { Request, Response, NextFunction } from "express";
import path from "node:path";
import zlib from "node:zlib";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = Number(process.env.PORT) || 3000;

// Native zlib compression middleware
function gzipMiddleware(req: Request, res: Response, next: NextFunction) {
  const acceptEncoding = (req.headers["accept-encoding"] as string) || "";
  if (!acceptEncoding.includes("gzip")) {
    return next();
  }

  const originalSend = res.send.bind(res);
  (res as any).send = function (body: any): Response {
    if (res.headersSent) return originalSend(body);

    const contentType = (res.getHeader("content-type") as string) || "";
    const isCompressible =
      contentType.includes("text") ||
      contentType.includes("javascript") ||
      contentType.includes("css") ||
      contentType.includes("json") ||
      contentType.includes("svg");

    if (isCompressible) {
      const buffer = Buffer.isBuffer(body) ? body : Buffer.from(typeof body === "string" ? body : JSON.stringify(body));
      if (buffer.length > 512) {
        try {
          const gzipped = zlib.gzipSync(buffer);
          res.setHeader("Content-Encoding", "gzip");
          res.setHeader("Content-Length", gzipped.length);
          res.setHeader("Vary", "Accept-Encoding");
          return originalSend(gzipped);
        } catch {
          return originalSend(body);
        }
      }
    }
    return originalSend(body);
  };
  next();
}

app.use(gzipMiddleware);

// Serve static assets from root with ETag, Last-Modified, and optimized Cache-Control
app.use(
  express.static(path.join(__dirname, "."), {
    etag: true,
    lastModified: true,
    setHeaders: (res, filePath) => {
      res.setHeader("Vary", "Accept-Encoding");
      if (filePath.endsWith(".html") || filePath.endsWith(".css") || filePath.endsWith(".js")) {
        res.setHeader("Cache-Control", "no-cache, must-revalidate");
      } else if (
        filePath.endsWith(".svg") ||
        filePath.endsWith(".woff2") ||
        filePath.endsWith(".png") ||
        filePath.endsWith(".jpg")
      ) {
        res.setHeader("Cache-Control", "public, max-age=86400, stale-while-revalidate=604800");
      }
    },
  })
);

// ==========================================================================
// REAL MARKET DATA ENDPOINT (SERVER-SIDE INTEGRATION)
// Securely proxies market-data requests to avoid exposing API keys in client.
// Implements server-side caching to respect provider rate limits and quotas.
// Never fabricates prices: marks status as UNAVAILABLE if credentials are unset.
// ==========================================================================

interface Instrument {
  id: string;
  cat: string;
  catAr: string;
  symbol: string;
  nameEn: string;
  nameAr: string;
  unit: string;
  currency: string;
  biquoteSymbol: string;
  instrumentType: string;
  instrumentTypeAr: string;
}

const REQUIRED_INSTRUMENTS: Instrument[] = [
  // 1. Precious Metals Spot Prices
  { id: "gold", cat: "METALS", catAr: "معادن", symbol: "XAU/USD", nameEn: "Gold Spot", nameAr: "الذهب الفوري", unit: "oz", currency: "USD", biquoteSymbol: "XAUUSD", instrumentType: "SPOT", instrumentTypeAr: "فوري" },
  { id: "silver", cat: "METALS", catAr: "معادن", symbol: "XAG/USD", nameEn: "Silver Spot", nameAr: "الفضة الفورية", unit: "oz", currency: "USD", biquoteSymbol: "XAGUSD", instrumentType: "SPOT", instrumentTypeAr: "فوري" },
  { id: "platinum", cat: "METALS", catAr: "معادن", symbol: "XPT/USD", nameEn: "Platinum Spot", nameAr: "البلاتين الفوري", unit: "oz", currency: "USD", biquoteSymbol: "XPTUSD", instrumentType: "SPOT", instrumentTypeAr: "فوري" },
  { id: "palladium", cat: "METALS", catAr: "معادن", symbol: "XPD/USD", nameEn: "Palladium Spot", nameAr: "البلاديوم الفوري", unit: "oz", currency: "USD", biquoteSymbol: "XPDUSD", instrumentType: "SPOT", instrumentTypeAr: "فوري" },

  // 2. Commodities & Energy
  { id: "brent", cat: "ENERGY", catAr: "طاقة", symbol: "UKOIL", nameEn: "Brent Crude", nameAr: "نفط برنت", unit: "bbl", currency: "USD", biquoteSymbol: "UKOIL", instrumentType: "COMMODITY_CFD", instrumentTypeAr: "عقود فروقات سلعية" },
  { id: "wti", cat: "ENERGY", catAr: "طاقة", symbol: "USOIL", nameEn: "WTI Crude", nameAr: "الخام الأمريكي WTI", unit: "bbl", currency: "USD", biquoteSymbol: "USOIL", instrumentType: "COMMODITY_CFD", instrumentTypeAr: "عقود فروقات سلعية" },

  // 3. Major Stock Indices
  { id: "spx", cat: "INDICES", catAr: "مؤشرات", symbol: "US500", nameEn: "S&P 500", nameAr: "ستاندرد آند بورز 500", unit: "pts", currency: "USD", biquoteSymbol: "US500", instrumentType: "INDEX_CFD", instrumentTypeAr: "مؤشر CFD" },
  { id: "ndx", cat: "INDICES", catAr: "مؤشرات", symbol: "USTEC", nameEn: "NASDAQ 100", nameAr: "ناسداك 100", unit: "pts", currency: "USD", biquoteSymbol: "USTEC", instrumentType: "INDEX_CFD", instrumentTypeAr: "مؤشر CFD" },
  { id: "dji", cat: "INDICES", catAr: "مؤشرات", symbol: "US30", nameEn: "Dow Jones", nameAr: "داو جونز", unit: "pts", currency: "USD", biquoteSymbol: "US30", instrumentType: "INDEX_CFD", instrumentTypeAr: "مؤشر CFD" },

  // 4. Major Currency Pairs
  { id: "eurusd", cat: "FX", catAr: "عملات", symbol: "EUR/USD", nameEn: "EUR / USD", nameAr: "يورو / دولار", unit: "", currency: "USD", biquoteSymbol: "EURUSD", instrumentType: "FOREX", instrumentTypeAr: "فوركس" },
  { id: "gbpusd", cat: "FX", catAr: "عملات", symbol: "GBP/USD", nameEn: "GBP / USD", nameAr: "استرليني / دولار", unit: "", currency: "USD", biquoteSymbol: "GBPUSD", instrumentType: "FOREX", instrumentTypeAr: "فوركس" },
  { id: "usdchf", cat: "FX", catAr: "عملات", symbol: "USD/CHF", nameEn: "USD / CHF", nameAr: "دولار / فرنك", unit: "", currency: "CHF", biquoteSymbol: "USDCHF", instrumentType: "FOREX", instrumentTypeAr: "فوركس" },
];

let marketCache: {
  lastFetched: number;
  backoffUntil: number;
  payload: any;
} = {
  lastFetched: 0,
  backoffUntil: 0,
  payload: null,
};
const CACHE_TTL_MS = 60 * 1000;
const BACKOFF_MS = 90 * 1000;

function formatInstrumentPrice(val: number | null | undefined, cat: string): string | null {
  if (val === null || val === undefined || isNaN(val)) return null;
  if (cat === "FX") return val.toFixed(4);
  if (val >= 1000) return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return val.toFixed(2);
}

function isGlobalForexMarketOpen(): boolean {
  const d = new Date();
  const day = d.getUTCDay();
  const hr = d.getUTCHours();
  if (day === 6) return false;
  if (day === 5 && hr >= 21) return false;
  if (day === 0 && hr < 21) return false;
  return true;
}

app.get("/api/market-ticker", async (req: Request, res: Response) => {
  const twelveDataKey = process.env.TWELVE_DATA_API_KEY || process.env.MARKET_DATA_API_KEY;
  const now = Date.now();

  if (now < marketCache.backoffUntil) {
    if (marketCache.payload) {
      return res.json({
        ...marketCache.payload,
        cached: true,
        status: "DELAYED",
        backoffActive: true,
      });
    }
    return res.json({
      status: "UNAVAILABLE",
      configured: Boolean(twelveDataKey),
      provider: twelveDataKey ? "Twelve Data + Biquote" : "Biquote",
      lastUpdated: null,
      cooldownSeconds: Math.ceil((marketCache.backoffUntil - now) / 1000),
      message: "Upstream rate limit cooldown active. Next live refresh queued.",
      instruments: REQUIRED_INSTRUMENTS.map((inst) => ({
        ...inst,
        price: null,
        formattedPrice: null,
        status: "UNAVAILABLE",
        lastUpdated: null,
      })),
    });
  }

  if (marketCache.payload && now - marketCache.lastFetched < CACHE_TTL_MS) {
    return res.json({ ...marketCache.payload, cached: true });
  }

  try {
    let twelveDataMap: Record<string, any> = {};

    if (twelveDataKey) {
      try {
        const supportedSymbols = "XAU/USD,EUR/USD,GBP/USD,USD/CHF";
        const apiUrl = `https://api.twelvedata.com/price?symbol=${encodeURIComponent(supportedSymbols)}&apikey=${encodeURIComponent(twelveDataKey)}`;

        const response = await fetch(apiUrl, {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(6000),
        });

        if (response.status === 429) {
          marketCache.backoffUntil = now + BACKOFF_MS;
        } else if (response.ok) {
          const json = (await response.json()) as any;
          if (json.code === 429 || (json.status === "error" && typeof json.message === "string" && json.message.includes("credits"))) {
            marketCache.backoffUntil = now + BACKOFF_MS;
          } else {
            twelveDataMap = json;
          }
        }
      } catch {
        // Silently continue to fallback provider
      }
    }

    const missingInstruments = REQUIRED_INSTRUMENTS.filter((inst) => {
      const q = twelveDataMap[inst.symbol] || twelveDataMap[inst.symbol.replace("/", "")];
      return !q || !q.price || q.code;
    });

    let biquoteMap: Record<string, any> = {};
    if (missingInstruments.length > 0) {
      try {
        const queryParams = missingInstruments.map((m) => `symbols=${encodeURIComponent(m.biquoteSymbol)}`).join("&");
        const biquoteUrl = `https://biquote.io/api/latest?${queryParams}`;

        const bqRes = await fetch(biquoteUrl, {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(6000),
        });

        if (bqRes.ok) {
          biquoteMap = (await bqRes.json()) as any;
        }
      } catch {
        // Silently continue
      }
    }

    const forexOpen = isGlobalForexMarketOpen();
    let liveCount = 0;
    let staleCount = 0;

    const mergedInstruments = REQUIRED_INSTRUMENTS.map((inst) => {
      const tdQuote = twelveDataMap[inst.symbol] || twelveDataMap[inst.symbol.replace("/", "")];
      if (tdQuote && tdQuote.price && !tdQuote.code) {
        const rawPrice = parseFloat(tdQuote.price);
        if (!isNaN(rawPrice) && rawPrice > 0) {
          const isLive = forexOpen;
          if (isLive) liveCount++;
          else staleCount++;
          return {
            ...inst,
            source: "Twelve Data",
            providerSymbol: inst.symbol,
            price: rawPrice,
            formattedPrice: formatInstrumentPrice(rawPrice, inst.cat),
            status: isLive ? "LIVE" : "DELAYED",
            marketState: isLive ? "open" : "closed",
            isLive,
            lastUpdated: new Date().toISOString(),
          };
        }
      }

      const bqQuote = biquoteMap[inst.biquoteSymbol];
      if (bqQuote) {
        let rawPrice: number | null = null;
        if (typeof bqQuote.mid === "number" && bqQuote.mid > 0) {
          rawPrice = bqQuote.mid;
        } else if (typeof bqQuote.bid === "number" && typeof bqQuote.ask === "number" && bqQuote.bid > 0 && bqQuote.ask > 0) {
          rawPrice = (bqQuote.bid + bqQuote.ask) / 2;
        } else if (typeof bqQuote.bid === "number" && bqQuote.bid > 0) {
          rawPrice = bqQuote.bid;
        } else if (typeof bqQuote.last === "number" && bqQuote.last > 0) {
          rawPrice = bqQuote.last;
        }

        if (rawPrice !== null && !isNaN(rawPrice) && rawPrice > 0) {
          const isMarketOpen = bqQuote.marketState === "open" && !bqQuote.stale;
          const quoteStatus = isMarketOpen ? "LIVE" : bqQuote.stale || bqQuote.marketState === "closed" ? "STALE" : "DELAYED";

          if (isMarketOpen) liveCount++;
          else staleCount++;

          return {
            ...inst,
            source: "Biquote",
            providerSymbol: bqQuote.symbol || inst.biquoteSymbol,
            price: rawPrice,
            formattedPrice: formatInstrumentPrice(rawPrice, inst.cat),
            status: quoteStatus,
            marketState: bqQuote.marketState || (isMarketOpen ? "open" : "closed"),
            isLive: isMarketOpen,
            quoteAgeSeconds: bqQuote.quoteAgeSeconds || null,
            lastUpdated: bqQuote.timestamp || bqQuote.lastQuoteAt || null,
          };
        }
      }

      return {
        ...inst,
        source: null,
        providerSymbol: null,
        price: null,
        formattedPrice: null,
        status: "UNAVAILABLE",
        marketState: "unavailable",
        isLive: false,
        lastUpdated: null,
      };
    });

    const hasAnyQuotes = mergedInstruments.some((i) => i.price !== null);
    const overallStatus = liveCount > 0 ? "LIVE" : staleCount > 0 ? "DELAYED" : "UNAVAILABLE";

    const payload = {
      status: overallStatus,
      configured: true,
      provider: "Twelve Data (Primary) + Biquote (Supplementary)",
      lastUpdated: new Date().toISOString(),
      instruments: mergedInstruments,
      summary: {
        total: REQUIRED_INSTRUMENTS.length,
        twelveDataCount: mergedInstruments.filter((i) => i.source === "Twelve Data").length,
        biquoteCount: mergedInstruments.filter((i) => i.source === "Biquote").length,
        unavailableCount: mergedInstruments.filter((i) => i.status === "UNAVAILABLE").length,
      },
    };

    if (hasAnyQuotes) {
      marketCache = {
        lastFetched: now,
        backoffUntil: marketCache.backoffUntil,
        payload,
      };
      return res.json(payload);
    }

    if (marketCache.payload) {
      return res.json({
        ...marketCache.payload,
        cached: true,
        status: "DELAYED",
      });
    }

    return res.json(payload);
  } catch (err: any) {
    if (marketCache.payload) {
      return res.json({
        ...marketCache.payload,
        cached: true,
        status: "DELAYED",
      });
    }
    return res.json({
      status: "UNAVAILABLE",
      configured: true,
      provider: "Twelve Data + Biquote",
      lastUpdated: null,
      error: err.message,
      instruments: REQUIRED_INSTRUMENTS.map((inst) => ({
        ...inst,
        price: null,
        formattedPrice: null,
        status: "UNAVAILABLE",
        lastUpdated: null,
      })),
    });
  }
});

app.use((req: Request, res: Response) => {
  res.setHeader("Cache-Control", "no-cache, must-revalidate");
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port} (host 0.0.0.0)`);
});
