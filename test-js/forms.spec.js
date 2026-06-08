const { test, expect } = require('@playwright/test');
const { toSitePath } = require('./site-path');

test.describe('URL Input And Query Handling', () => {
  test('project route with query parameter renders details', async ({ page }) => {
    await page.goto(toSitePath('/project.html?project=qa-automation-template'));
    await expect(page.locator('#project-title')).toContainText(/QA Automation Template/i);
    await expect(page.locator('#latest-meta .card')).toHaveCount(6);
  });

  test('project route without query shows missing project state', async ({ page }) => {
    await page.goto(toSitePath('/project.html'));
    await expect(page.locator('#project-title')).toContainText(/Missing project id/i);
  });

  test('project route exposes coverage audit evidence for valid project', async ({ page }) => {
    await page.goto(toSitePath('/project.html?project=qa-automation-template'));

    const coverageLink = page.locator('#coverage-link');
    await expect(coverageLink).toHaveAttribute(
      'href',
      /data\/projects\/qa-automation-template\/coverage-audit\.json$/,
    );
    await expect(page.locator('#coverage-summary .card').first()).toBeVisible();
  });

  test('invalid project id shows fetch failure state', async ({ page }) => {
    await page.goto(toSitePath('/project.html?project=does-not-exist'));
    await expect(page.locator('#project-title')).toContainText(/Failed to fetch/i);
  });
});
