const pw = require('/root/.bun/install/global/node_modules/playwright-core');

async function testViewport(width, height) {
  console.log(`=== Testing viewport ${width}x${height} ===`);
  const browser = await pw.chromium.launch({
    executablePath: '/ms-playwright/chromium_headless_shell-1247/chrome-headless-shell-linux64/chrome-headless-shell',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage({
    viewport: { width, height }
  });

  // Pre-seed sovereign session so login modal doesn't show
  await page.addInitScript(() => {
    sessionStorage.setItem("1percent_sovereign_session", JSON.stringify({
      email: "member@the1percent.club",
      provider: "credentials",
      timestamp: Date.now()
    }));
  });

  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });

  // Navigate to Club tab
  await page.evaluate(() => {
    document.querySelector('[data-tab="club"]').click();
  });
  await page.waitForTimeout(400);

  // Switch to Leaderboard
  await page.evaluate(() => {
    document.getElementById('roomBtnLeaderboard').click();
  });
  await page.waitForTimeout(600);

  // Check initial state before scroll
  const initial = await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    const cv = document.getElementById('clubChatViewport');
    const bNav = document.querySelector('.bottom-nav');
    const rLb = lb ? lb.getBoundingClientRect() : null;
    const rCv = cv ? cv.getBoundingClientRect() : null;
    const rNav = bNav ? bNav.getBoundingClientRect() : null;
    const cvStyle = cv ? window.getComputedStyle(cv) : null;
    return {
      lb: rLb ? { top: rLb.top, bottom: rLb.bottom, height: rLb.height, scrollHeight: lb.scrollHeight, clientHeight: lb.clientHeight } : null,
      cv: {
        display: cvStyle ? cvStyle.display : null,
        visibility: cvStyle ? cvStyle.visibility : null,
        height: rCv ? rCv.height : null
      },
      bNav: rNav ? { top: rNav.top, bottom: rNav.bottom, height: rNav.height } : null,
      horizontalOverflow: document.documentElement.scrollWidth > window.innerWidth
    };
  });
  console.log('Initial metrics:', JSON.stringify(initial, null, 2));
  await page.screenshot({ path: `final_preview_${width}x${height}_initial.png` });

  // Scroll to bottom
  await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    if (lb) lb.scrollTop = lb.scrollHeight;
  });
  await page.waitForTimeout(400);

  // Check state after scroll
  const scrolled = await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    const bNav = document.querySelector('.bottom-nav');
    const selfCard = document.querySelector('.sl-self-card');
    const rLb = lb ? lb.getBoundingClientRect() : null;
    const rNav = bNav ? bNav.getBoundingClientRect() : null;
    const rSelf = selfCard ? selfCard.getBoundingClientRect() : null;
    return {
      lb: rLb ? { top: rLb.top, bottom: rLb.bottom, height: rLb.height, scrollTop: lb.scrollTop } : null,
      bNav: rNav ? { top: rNav.top, bottom: rNav.bottom, height: rNav.height } : null,
      selfCard: rSelf ? { top: rSelf.top, bottom: rSelf.bottom, height: rSelf.height } : null,
      selfCardFullyVisible: rSelf && rLb ? (rSelf.top >= rLb.top && rSelf.bottom <= rLb.bottom) : false,
      cardClearOfBottomNav: rLb && rNav ? (rLb.bottom <= rNav.top) : false
    };
  });
  console.log('Scrolled metrics:', JSON.stringify(scrolled, null, 2));
  await page.screenshot({ path: `final_preview_${width}x${height}_scrolled.png` });

  // Now test switching back to a chat chamber (e.g. global lounge) and ensure chat works!
  await page.evaluate(() => {
    const firstRoom = document.querySelector('.club-room-btn[data-channel="global-lounge"]');
    if (firstRoom) firstRoom.click();
  });
  await page.waitForTimeout(400);

  const restored = await page.evaluate(() => {
    const lb = document.getElementById('clubLeaderboardContainer');
    const cv = document.getElementById('clubChatViewport');
    const lbStyle = lb ? window.getComputedStyle(lb) : null;
    const cvStyle = cv ? window.getComputedStyle(cv) : null;
    return {
      leaderboardDisplay: lbStyle ? lbStyle.display : null,
      chatViewportDisplay: cvStyle ? cvStyle.display : null,
      chatViewportHeight: cv ? cv.getBoundingClientRect().height : null
    };
  });
  console.log('Restored to chat room:', JSON.stringify(restored, null, 2));

  await browser.close();
}

async function main() {
  await testViewport(390, 844);
  await testViewport(360, 800);
  console.log('All tests passed successfully!');
}

main().catch(console.error);
