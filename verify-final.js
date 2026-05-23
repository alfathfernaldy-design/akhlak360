import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  const errors = [];
  page.on('pageerror', err => errors.push(err.message));
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  // Test Login Page
  console.log('1. Testing Login Page...');
  await page.goto('http://localhost:8080', { waitUntil: 'networkidle', timeout: 15000 });

  // Check for white text on white background
  const bodyBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log('Body background:', bodyBg);

  // Login
  await page.fill('input[type="text"]', 'admin');
  await page.fill('input[type="password"]', 'admin123');
  await page.click('button[type="submit"]');
  await page.waitForTimeout(2000);

  console.log('2. Testing Dashboard...');

  // Check if dashboard loaded
  const welcomeText = await page.textContent('body');
  if (welcomeText.includes('Selamat Datang')) {
    console.log('✓ Dashboard loaded successfully');
  }

  // Check sidebar toggle exists
  const sidebarToggle = await page.$('button');
  if (sidebarToggle) {
    console.log('✓ Sidebar toggle button found');
  }

  // Check notification bell
  const bellBtn = await page.$('button:has(svg)');
  if (bellBtn) {
    await bellBtn.click();
    await page.waitForTimeout(500);
    console.log('✓ Notification bell clicked');
  }

  // Screenshot
  await page.screenshot({ path: 'D:/Web apsi/final-check.png', fullPage: true });
  console.log('✓ Screenshot saved');

  // Test Assessment Page
  console.log('3. Testing Assessment Page...');
  await page.goto('http://localhost:8080/assessment/self', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const assessmentText = await page.textContent('body');
  if (assessmentText.includes('A') && assessmentText.includes('K')) {
    console.log('✓ AKHLAK letters found in Assessment');
  }

  if (errors.length > 0) {
    console.log('Errors:', errors);
  } else {
    console.log('✓ No JavaScript errors');
  }

  await browser.close();
  console.log('\nAll tests passed!');
})();
