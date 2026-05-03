const { test, expect } = require('@playwright/test');

test.describe('Public Access', () => {
  test('all main pages are publicly reachable without auth redirect', async ({ page }) => {
    for (const path of ['/', '/about.html', '/portfolio.html', '/dashboard.html']) {
      const response = await page.goto(path);
      expect(response && response.ok()).toBeTruthy();
      await expect(page).not.toHaveURL(/login|signin|auth/i);
    }
  });

  test('portfolio external links open in a new tab safely', async ({ page }) => {
    await page.goto('/portfolio.html');
    const externalLinks = page.locator('#portfolio-cards a[target="_blank"][rel*="noreferrer"]');
    await expect(externalLinks.first()).toBeVisible();
    expect(await externalLinks.count()).toBeGreaterThan(0);
  });
});
