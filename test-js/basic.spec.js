const { test, expect } = require('@playwright/test');
const { toSitePath } = require('./site-path');

test.describe('Portfolio Basic Checks', () => {
  test('homepage loads with core identity text', async ({ page }) => {
    await page.goto(toSitePath('/'));
    await expect(page).toHaveTitle(/Daniel Hogg|QA Automation Portfolio/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/automation/i);
    // Two "View Automation Projects" links exist on the page (hero CTA + overview panel) — check the first
    await expect(page.getByRole('link', { name: /View Automation Projects/i }).first()).toBeVisible();
  });

  test('homepage proof strip renders', async ({ page }) => {
    await page.goto(toSitePath('/'));
    const strip = page.locator('#proof-strip');
    await expect(strip).toBeVisible();
    await expect(strip).toContainText(/Passing|Failing|Active project/i);
  });
});
