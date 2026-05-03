const { test, expect } = require('@playwright/test');

test.describe('Error Handling', () => {
  test('invalid project id surfaces a fetch error message', async ({ page }) => {
    await page.goto('/project.html?project=does-not-exist');
    await expect(page.locator('#project-title')).toContainText(/Failed to fetch/i);
  });

  test('dashboard still renders even when some data is stale', async ({ page }) => {
    await page.goto('/dashboard.html');
    await expect(page.locator('#project-cards .card').first()).toBeVisible();
    const staleOrFresh = page.locator('#project-cards .card p').filter({ hasText: /Fresh|Stale/i }).first();
    await expect(staleOrFresh).toBeVisible();
  });
});
