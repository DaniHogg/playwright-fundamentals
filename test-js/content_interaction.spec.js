const { test, expect } = require('@playwright/test');
const { toSitePath } = require('./site-path');

test.describe('Portfolio Content Rendering', () => {
  test('portfolio cards render from JSON', async ({ page }) => {
    await page.goto(toSitePath('/portfolio.html'));
    const cards = page.locator('#portfolio-cards .card');
    await expect(cards.first()).toBeVisible();
    expect(await cards.count()).toBeGreaterThanOrEqual(7);
  });

  test('portfolio cards include what/why/how fields', async ({ page }) => {
    await page.goto(toSitePath('/portfolio.html'));
    const first = page.locator('#portfolio-cards .card').first();
    await expect(first).toContainText(/How it's built:/i);
    await expect(first).toContainText(/What was tested:/i);
    await expect(first).toContainText(/Why it matters:/i);
  });
});
