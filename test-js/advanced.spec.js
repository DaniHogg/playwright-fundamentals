const { test, expect } = require('@playwright/test');
const { toSitePath } = require('./site-path');

test.describe('Advanced Data Assertions', () => {
  test('project detail page shows suite rows and run history', async ({ page }) => {
    await page.goto(toSitePath('/project.html?project=qa-automation-template'));
    await expect(page.locator('#suite-rows tr').first()).toBeVisible();
    await expect(page.locator('#history-list li').first()).toBeVisible();
  });

  test('coverage audit panel is populated', async ({ page }) => {
    await page.goto(toSitePath('/project.html?project=qa-automation-template'));
    await expect(page.locator('#coverage-summary .card').first()).toBeVisible();
    await expect(page.locator('#coverage-link')).toHaveAttribute(
      'href',
      'data/projects/qa-automation-template/coverage-audit.json',
    );
  });
});
