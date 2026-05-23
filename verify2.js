import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Listen for console errors
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', err => {
    errors.push(err.message);
  });

  console.log('Navigating to login page...');
  await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });

  // Fill login form
  console.log('Logging in...');
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');

  // Wait for navigation
  await page.waitForURL('**/dashboard', { timeout: 5000 });
  console.log('Navigated to dashboard');

  // Wait for content to load
  await page.waitForTimeout(2000);

  // Take screenshot
  await page.screenshot({ path: 'D:/Web apsi/dashboard-screenshot.png', fullPage: true });
  console.log('Dashboard screenshot saved');

  // Get page content
  const bodyContent = await page.textContent('body');
  console.log('Body content length:', bodyContent.length);

  if (bodyContent.length < 100) {
    console.log('WARNING: Page content seems empty');
  } else {
    console.log('Page has content');
  }

  // Check for errors
  if (errors.length > 0) {
    console.log('Console errors:', errors);
  } else {
    console.log('No console errors');
  }

  await browser.close();
})();
