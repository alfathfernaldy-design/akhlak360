import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log('Opening http://localhost:8080...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle', timeout: 15000 });

  console.log('Page loaded. Taking screenshot of login...');
  await page.screenshot({ path: 'D:/Web apsi/login-check.png', fullPage: false });
  console.log('Login screenshot saved');

  // Try to login
  console.log('Attempting to login...');

  // Wait for input fields
  await page.waitForSelector('input[type="text"]', { timeout: 5000 }).catch(() => {
    console.log('Could not find username input');
  });

  const usernameInput = await page.$('input[type="text"]');
  const passwordInput = await page.$('input[type="password"]');

  if (usernameInput && passwordInput) {
    await usernameInput.fill('admin');
    await passwordInput.fill('admin123');

    await page.click('button[type="submit"]');
    console.log('Clicked submit');

    await page.waitForTimeout(2000);

    console.log('Taking dashboard screenshot...');
    await page.screenshot({ path: 'D:/Web apsi/dashboard-check.png', fullPage: true });
    console.log('Dashboard screenshot saved');

    // Check body content
    const content = await page.textContent('body');
    console.log('Body content length:', content.length);
    if (content.includes('Selamat Datang')) {
      console.log('SUCCESS: Welcome message found');
    }
    if (content.includes('Dashboard')) {
      console.log('SUCCESS: Dashboard content found');
    }
  } else {
    console.log('Could not find login form');
  }

  if (errors.length > 0) {
    console.log('Errors found:', errors);
  } else {
    console.log('No JavaScript errors');
  }

  await browser.close();
})();
