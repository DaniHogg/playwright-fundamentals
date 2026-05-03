const { test, expect } = require('@playwright/test');

test.describe('Performance Baseline', () => {
  test('homepage reaches domcontentloaded under 8 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(8000);
    await expect(page.locator('h1')).toBeVisible();
  });

  test('dashboard cards render under 10 seconds', async ({ page }) => {
    const start = Date.now();
    await page.goto('/dashboard.html');
    await expect(page.locator('#project-cards .card').first()).toBeVisible();
    const elapsed = Date.now() - start;
    expect(elapsed).toBeLessThan(10000);
  });
});
