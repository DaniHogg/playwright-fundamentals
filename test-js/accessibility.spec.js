const { test, expect } = require('@playwright/test');

test.describe('Accessibility Baseline', () => {
  test('document language and landmarks are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
    await expect(page.locator('main.shell')).toBeVisible();
    await expect(page.locator('nav[aria-label="Primary"]')).toBeVisible();
  });

  test('interactive links have accessible names', async ({ page }) => {
    await page.goto('/');
    // Hero CTA appears twice (hero + overview panel); check first occurrence has an accessible name
    await expect(page.getByRole('link', { name: /View Automation Projects/i }).first()).toBeVisible();
    await expect(page.getByRole('link', { name: /Open Test Results/i }).first()).toBeVisible();
  });
});
