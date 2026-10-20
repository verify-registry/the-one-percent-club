const pw = require('/root/.bun/install/global/node_modules/playwright-core');

(async () => {
  const browser = await pw.chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  for (const lang of ['ar', 'en']) {
    for (const w of [360, 390, 430]) {
      const page = await browser.newPage({ viewport: { width: w, height: 844 } });
      await page.addInitScript((l) => {
        sessionStorage.setItem('1percent_sovereign_session', JSON.stringify({
          email: 'member@the1percent.club',
          provider: 'credentials',
          timestamp: Date.now()
        }));
        localStorage.setItem('one_percent_lang', l);
      }, lang);
      await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
      await page.evaluate(() => document.querySelector('[data-tab="club"]').click());
      await page.waitForTimeout(500);

      const data = await page.evaluate(() => {
        const bar = document.getElementById('clubCreditsDisplay');
        const info = bar ? bar.querySelector('.club-credits-info') : null;
        const crown = bar ? bar.querySelector('.club-credits-crown') : null;
        const label = bar ? bar.querySelector('.club-credits-label') : null;
        const readout = document.getElementById('clubCreditsText');
        const gauge = document.getElementById('gaugePipsStrip');
        const buyBtn = document.getElementById('clubCreditsBuyBtn');

        const box = (el) => {
          if (!el) return null;
          const r = el.getBoundingClientRect();
          return {
            left: Math.round(r.left),
            right: Math.round(r.right),
            width: Math.round(r.width),
            height: Math.round(r.height),
            top: Math.round(r.top)
          };
        };

        const gRect = gauge ? gauge.getBoundingClientRect() : null;
        const bRect = buyBtn ? buyBtn.getBoundingClientRect() : null;
        const isOverlapping = gRect && bRect ? (
          Math.max(gRect.left, bRect.left) < Math.min(gRect.right, bRect.right)
        ) : false;

        const gap = gRect && bRect ? (
          document.documentElement.dir === 'rtl' ?
            Math.round(gRect.left - bRect.right) :
            Math.round(bRect.left - gRect.right)
        ) : 0;

        return {
          dir: document.documentElement.dir,
          lang: document.documentElement.lang,
          bar: box(bar),
          info: box(info),
          label: { ...box(label), text: label ? label.innerText : '' },
          readout: { ...box(readout), text: readout ? readout.innerText : '' },
          gauge: box(gauge),
          buyBtn: { ...box(buyBtn), text: buyBtn ? buyBtn.innerText.replace(/\n/g, ' ') : '' },
          isOverlapping,
          gap
        };
      });

      console.log(`[${lang} ${w}px] Overlapping: ${data.isOverlapping}, Gap: ${data.gap}px`);
      console.log(JSON.stringify(data, null, 2));
      const barEl = await page.locator('#clubCreditsDisplay');
      if (await barEl.count() > 0) {
        await barEl.screenshot({ path: `bar_${lang}_${w}.png` });
      }
      await page.close();
    }
  }
  await browser.close();
})();
