const pw = require('/root/.bun/install/global/node_modules/playwright-core');

async function run() {
  const browser = await pw.chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width: 390, height: 844 }
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Click on Club tab in bottom nav
  console.log('Navigating to Club...');
  await page.evaluate(() => {
    if (typeof window.goToPage === 'function') {
      window.goToPage('club');
    } else {
      const btn = document.querySelector('[data-tab="club"]');
      if (btn) btn.click();
    }
  });

  await page.waitForTimeout(500);

  // Click on Leaderboard room
  console.log('Switching to Leaderboard chamber...');
  await page.evaluate(() => {
    if (typeof window.switchClubRoom === 'function') {
      window.switchClubRoom('leaderboard');
    } else {
      const btn = document.getElementById('roomBtnLeaderboard');
      if (btn) btn.click();
    }
  });

  await page.waitForTimeout(1000);

  // Measure dimensions
  const metrics = await page.evaluate(() => {
    const clubTab = document.getElementById('club-tab');
    const header = document.getElementById('clubHeader');
    const hud = document.getElementById('clubFloatingHud');
    const lb = document.getElementById('clubLeaderboardContainer');
    const bottomNav = document.querySelector('.bottom-nav');
    const selfCard = document.querySelector('.sl-self-card');

    const getBounds = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const style = window.getComputedStyle(el);
      return {
        top: rect.top,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        width: rect.width,
        height: rect.height,
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        offsetHeight: el.offsetHeight,
        scrollTop: el.scrollTop,
        maxScrollTop: el.scrollHeight - el.clientHeight,
        display: style.display,
        flex: style.flex,
        heightStyle: style.height,
        maxHeightStyle: style.maxHeight,
        overflowY: style.overflowY,
        paddingBottom: style.paddingBottom,
        marginBottom: style.marginBottom,
      };
    };

    return {
      windowHeight: window.innerHeight,
      clubTab: getBounds(clubTab),
      header: getBounds(header),
      hud: getBounds(hud),
      leaderboard: getBounds(lb),
      bottomNav: getBounds(bottomNav),
      selfCard: getBounds(selfCard),
    };
  });

  console.log('METRICS BEFORE SCROLL:');
  console.log(JSON.stringify(metrics, null, 2));

  // Take screenshot before scroll
  await page.screenshot({ path: '/tmp/leaderboard_before_scroll_390.png' });

  // Now scroll the leaderboard to bottom
  await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    if (lb) {
      lb.scrollTop = lb.scrollHeight;
    }
  });

  await page.waitForTimeout(500);

  const scrolledMetrics = await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    const bottomNav = document.querySelector('.bottom-nav');
    const selfCard = document.querySelector('.sl-self-card');

    const getBounds = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        top: rect.top,
        bottom: rect.bottom,
        height: rect.height,
        scrollTop: el.scrollTop,
      };
    };

    return {
      leaderboard: getBounds(lb),
      bottomNav: getBounds(bottomNav),
      selfCard: getBounds(selfCard),
    };
  });

  console.log('METRICS AFTER SCROLL TO BOTTOM:');
  console.log(JSON.stringify(scrolledMetrics, null, 2));

  await page.screenshot({ path: '/tmp/leaderboard_after_scroll_390.png' });

  await browser.close();
  console.log('Done!');
}

run().catch(console.error);
