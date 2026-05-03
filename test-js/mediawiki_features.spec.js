const { test, expect } = require('@playwright/test');

test.describe('Dashboard Evidence Features', () => {
  test('dashboard cards include repository and workflow links', async ({ page }) => {
    await page.goto('/dashboard.html');
    const card = page.locator('#project-cards .card').first();
    await expect(card).toBeVisible();
    await expect(card.getByRole('link', { name: 'Repository' })).toBeVisible();
    await expect(card.getByRole('link', { name: 'Workflow run' })).toBeVisible();
  });

  test('homepage proof strip includes tooling chips', async ({ page }) => {
    await page.goto('/');
    const tools = page.locator('#proof-strip .tool-chip');
    await expect(tools.first()).toBeVisible();
    await expect(page.locator('#proof-strip')).toContainText(/Playwright|Selenium|Pytest|k6/i);
  });
});
