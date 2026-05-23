import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  console.log('Navigating to http://localhost:5173...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  console.log('Page title:', await page.title());

  // Check for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  // Wait a bit for any errors to appear
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'D:/Web apsi/verification-screenshot.png', fullPage: true });
  console.log('Screenshot saved to D:/Web apsi/verification-screenshot.png');

  // Check if login page loaded
  const loginText = await page.textContent('body');
  if (loginText.includes('AKHLAK')) {
    console.log('SUCCESS: AKHLAK branding found on page');
  }
  if (loginText.includes('Masuk')) {
    console.log('SUCCESS: Login button found');
  }

  if (errors.length > 0) {
    console.log('Console errors found:', errors);
  } else {
    console.log('No console errors detected');
  }

  await browser.close();
  console.log('Verification complete!');
})();
