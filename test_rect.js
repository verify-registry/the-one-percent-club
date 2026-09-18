const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  await page.setViewport({ width: 390, height: 844 });
  await page.goto(`file://${process.cwd()}/index.html`, { waitUntil: 'networkidle0' });

  await page.evaluate(() => {
    document.querySelector('[data-tab="profile"]').click();
  });
  
  await new Promise(r => setTimeout(r, 500));

  const debugInfo = await page.evaluate(() => {
    const hero = document.querySelector('.profile-hero-card');
    return hero ? hero.getBoundingClientRect().top : null;
  });
  
  console.log("Hero top:", debugInfo);

  await browser.close();
})();
