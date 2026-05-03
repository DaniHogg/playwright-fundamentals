const { test, expect } = require('@playwright/test');

const pages = [
  ['/', /Daniel Hogg|QA Automation/i],
  ['/about.html', /About Me/i],
  ['/portfolio.html', /Automation Projects/i],
  ['/dashboard.html', /Test Evidence|Test Results/i],
];

test.describe('Site Smoke', () => {
  for (const [url, titlePattern] of pages) {
    test(`loads ${url}`, async ({ page }) => {
      const response = await page.goto(url);
      expect(response && response.ok()).toBeTruthy();
      await expect(page).toHaveTitle(titlePattern);
      await expect(page.locator('nav.top-nav')).toBeVisible();
    });
  }
});
