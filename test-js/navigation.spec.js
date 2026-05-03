const { test, expect } = require('@playwright/test');

const targets = ['/', '/about.html', '/portfolio.html', '/dashboard.html'];

test.describe('Primary Navigation', () => {
  for (const url of targets) {
    test(`nav links are visible on ${url}`, async ({ page }) => {
      await page.goto(url);
      const nav = page.locator('nav.top-nav');
      await expect(nav).toBeVisible();
      await expect(nav.getByRole('link', { name: 'About Me' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Automation Projects' })).toBeVisible();
      await expect(nav.getByRole('link', { name: 'Test Results' })).toBeVisible();
    });
  }

  test('dashboard card links navigate to project detail pages', async ({ page }) => {
    await page.goto('/dashboard.html');
    const firstDetails = page.getByRole('link', { name: 'View details' }).first();
    await expect(firstDetails).toBeVisible();
    await firstDetails.click();
    await expect(page).toHaveURL(/project\.html\?project=/);
    await expect(page.locator('#project-title')).not.toHaveText('Loading...');
  });
});
