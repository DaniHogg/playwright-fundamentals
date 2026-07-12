const { test, expect, devices } = require('@playwright/test');
const { toSitePath } = require('./site-path');

// Mobile/responsive check for the homepage scenario covered on desktop in
// basic.spec.js. Uses a real device profile (viewport, user agent, touch)
// instead of just shrinking the viewport, so this exercises the site's
// responsive layout the way an actual phone visitor would.
test.use({ ...devices['iPhone 13'] });

test.describe('Mobile Viewport: iPhone 13', () => {
  test('homepage loads with core identity text on a mobile viewport', async ({ page }) => {
    await page.goto(toSitePath('/'));
    await expect(page).toHaveTitle(/Daniel Hogg|QA Automation Portfolio/i);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/automation/i);
    await expect(page.getByRole('link', { name: /View Automation Projects/i }).first()).toBeVisible();

    const strip = page.locator('#proof-strip');
    await expect(strip).toBeVisible();
    await expect(strip).toContainText(/Active projects?/i);
  });
});
