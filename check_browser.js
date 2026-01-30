const { chromium } = require('playwright');

(async () => {
  try {
    console.log('Launching browser...');
    const browser = await chromium.launch();
    const page = await browser.newPage();
    console.log('Navigating to localhost...');
    await page.goto('http://localhost:3000');
    const title = await page.title();
    console.log(`Page Title: ${title}`);
    const h1 = await page.textContent('h1');
    console.log(`H1 Text: ${h1}`);
    await browser.close();
    console.log('SUCCESS: Browser verification passed.');
  } catch (error) {
    console.error('FAILURE:', error);
    process.exit(1);
  }
})();
