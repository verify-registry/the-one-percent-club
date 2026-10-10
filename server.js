const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, ".")));

// ==========================================================================
// REAL MARKET DATA ENDPOINT (SERVER-SIDE INTEGRATION)
// Securely proxies market-data requests to avoid exposing API keys in client.
// Implements server-side caching to respect provider rate limits and quotas.
// Never fabricates prices: marks status as UNAVAILABLE if credentials are unset.
// ==========================================================================

const REQUIRED_INSTRUMENTS = [
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

let marketCache = {
  lastFetched: 0,
  backoffUntil: 0,
  payload: null,
};
const CACHE_TTL_MS = 60 * 1000; // 60s cache window to respect Twelve Data limits (8 credits/min) and Biquote fair use
const BACKOFF_MS = 90 * 1000;   // 90s backoff cooldown when upstream hits 429

function formatInstrumentPrice(val, cat) {
  if (val === null || val === undefined || isNaN(val)) return null;
  if (cat === "FX") return val.toFixed(4);
  if (val >= 1000) return val.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return val.toFixed(2);
}

function isGlobalForexMarketOpen() {
  const d = new Date();
  const day = d.getUTCDay();
  const hr = d.getUTCHours();
  // Forex & metals market closed from Friday 21:00 UTC through Sunday 21:00 UTC
  if (day === 6) return false;
  if (day === 5 && hr >= 21) return false;
  if (day === 0 && hr < 21) return false;
  return true;
}

app.get("/api/market-ticker", async (req, res) => {
  const twelveDataKey = process.env.TWELVE_DATA_API_KEY || process.env.MARKET_DATA_API_KEY;
  const now = Date.now();

  // If in active backoff cooldown (e.g. following provider 429)
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

  // Check valid in-memory cache
  if (marketCache.payload && now - marketCache.lastFetched < CACHE_TTL_MS) {
    return res.json({ ...marketCache.payload, cached: true });
  }

  try {
    let twelveDataMap = {};
    let twelveDataError = null;

    // STEP 1: Query Primary Provider (Twelve Data) for supported instruments (Gold spot + Forex)
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
          twelveDataError = "TWELVE_DATA_RATE_LIMIT";
        } else if (response.ok) {
          const json = await response.json();
          if (json.code === 429 || (json.status === "error" && typeof json.message === "string" && json.message.includes("credits"))) {
            marketCache.backoffUntil = now + BACKOFF_MS;
            twelveDataError = "TWELVE_DATA_CREDITS_EXHAUSTED";
          } else {
            twelveDataMap = json;
          }
        }
      } catch (tdErr) {
        twelveDataError = tdErr.message;
      }
    }

    // STEP 2: Identify missing or unsupported instruments
    const missingInstruments = REQUIRED_INSTRUMENTS.filter((inst) => {
      const q = twelveDataMap[inst.symbol] || twelveDataMap[inst.symbol.replace("/", "")];
      return !q || !q.price || q.code;
    });

    // STEP 3: Query Supplementary Provider (Biquote) in a single server-side batch call
    let biquoteMap = {};
    if (missingInstruments.length > 0) {
      try {
        const queryParams = missingInstruments.map((m) => `symbols=${encodeURIComponent(m.biquoteSymbol)}`).join("&");
        const biquoteUrl = `https://biquote.io/api/latest?${queryParams}`;

        const bqRes = await fetch(biquoteUrl, {
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(6000),
        });

        if (bqRes.ok) {
          biquoteMap = await bqRes.json();
        }
      } catch (bqErr) {
        // Continue with whatever quotes were fetched
      }
    }

    const forexOpen = isGlobalForexMarketOpen();
    let liveCount = 0;
    let staleCount = 0;

    const mergedInstruments = REQUIRED_INSTRUMENTS.map((inst) => {
      // 1. Check Primary: Twelve Data
      const tdQuote = twelveDataMap[inst.symbol] || twelveDataMap[inst.symbol.replace("/", "")];
      if (tdQuote && tdQuote.price && !tdQuote.code) {
        const rawPrice = parseFloat(tdQuote.price);
        if (!isNaN(rawPrice) && rawPrice > 0) {
          const isLive = forexOpen;
          if (isLive) liveCount++; else staleCount++;
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

      // 2. Check Supplementary: Biquote
      const bqQuote = biquoteMap[inst.biquoteSymbol];
      if (bqQuote) {
        let rawPrice = null;
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
          const quoteStatus = isMarketOpen ? "LIVE" : (bqQuote.stale || bqQuote.marketState === "closed" ? "STALE" : "DELAYED");

          if (isMarketOpen) liveCount++; else staleCount++;

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

      // 3. Fallback: UNAVAILABLE
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
    const overallStatus = liveCount > 0 ? "LIVE" : (staleCount > 0 ? "DELAYED" : "UNAVAILABLE");

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

    // If completely unavailable and cached payload exists, return cached
    if (marketCache.payload) {
      return res.json({
        ...marketCache.payload,
        cached: true,
        status: "DELAYED",
      });
    }

    return res.json(payload);
  } catch (err) {
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

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port ${port}`);
});
