const puppeteer = require("puppeteer-core");
const fs = require("fs");

async function capture() {
  console.log("Launching headless Chromium with high-fidelity rendering...");
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
      "--force-color-profile=srgb",
      "--font-render-hinting=max",
      "--enable-font-antialiasing"
    ]
  });

  const page = await browser.newPage();
  
  // Set ultra-high-definition scale (deviceScaleFactor: 4)
  await page.setViewport({
    width: 430,
    height: 950,
    deviceScaleFactor: 4
  });

  console.log("Navigating to http://localhost:3000/ ...");
  await page.goto("http://localhost:3000/", { waitUntil: "networkidle0" });

  // Explicitly load and await all luxury Arabic and English editorial fonts
  await page.evaluate(async () => {
    try {
      await Promise.all([
        document.fonts.load("400 14px Cairo"),
        document.fonts.load("600 16px Cairo"),
        document.fonts.load("700 20px Cairo"),
        document.fonts.load("400 14px Amiri"),
        document.fonts.load("700 18px Amiri"),
        document.fonts.load("500 16px 'Cormorant Garamond'"),
        document.fonts.load("600 24px 'Cormorant Garamond'"),
        document.fonts.load("500 14px Inter"),
        document.fonts.load("600 14px Inter")
      ]);
    } catch (e) {
      console.warn("Font loading error:", e);
    }
    await document.fonts.ready;
  });

  // Re-trigger guilloche redraw at this viewport and DPR
  await page.evaluate(() => {
    const card = document.getElementById("membershipCard");
    if (card) {
      card.style.transform = "none";
      card.style.transition = "none";
      card.classList.remove("is-hovered", "is-long-press-active");
    }
    const tooltips = document.querySelectorAll(".metric-tooltip");
    tooltips.forEach(t => {
      t.style.display = "none";
      t.classList.remove("is-tooltip-open");
    });
    // Trigger window resize event to let Guilloche resize cleanly to DPR: 4
    window.dispatchEvent(new Event("resize"));
  });

  // Wait for canvas redraw to settle
  await new Promise(r => setTimeout(r, 1200));

  const cardHandle = await page.$("#membershipCard");
  if (!cardHandle) {
    throw new Error("Could not find #membershipCard element");
  }

  const box = await cardHandle.boundingBox();
  console.log("Card bounding box:", box);

  const outputPath = "master-card-ultra-hd.png";
  await cardHandle.screenshot({
    path: outputPath,
    type: "png",
    omitBackground: true
  });

  await browser.close();

  const stats = fs.statSync(outputPath);
  console.log(`Success! Exported Master Card PNG to ${outputPath} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
}

capture().catch(err => {
  console.error("Error capturing card:", err);
  process.exit(1);
});
