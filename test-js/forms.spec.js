const { test, expect } = require('@playwright/test');

test.describe('URL Input And Query Handling', () => {
  test('project route with query parameter renders details', async ({ page }) => {
    await page.goto('/project.html?project=qa-automation-template');
    await expect(page.locator('#project-title')).toContainText(/QA Automation Template/i);
    await expect(page.locator('#latest-meta .card')).toHaveCount(6);
  });

  test('project route without query shows missing project state', async ({ page }) => {
    await page.goto('/project.html');
    await expect(page.locator('#project-title')).toContainText(/Missing project id/i);
  });
});
