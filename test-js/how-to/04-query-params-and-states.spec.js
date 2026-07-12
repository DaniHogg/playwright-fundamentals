const { test, expect } = require('@playwright/test');

test.describe('How-To 04: Query Params And UI States', () => {
  test('valid project query renders project details', async ({ page }) => {
    await page.setContent(`
      <h1 id="project-title">QA Automation Template</h1>
      <div id="latest-meta">
        <div class="card">Meta 1</div>
        <div class="card">Meta 2</div>
        <div class="card">Meta 3</div>
        <div class="card">Meta 4</div>
        <div class="card">Meta 5</div>
        <div class="card">Meta 6</div>
      </div>
    `);

    await expect(page.locator('#project-title')).toContainText(/QA Automation Template/i);
    await expect(page.locator('#latest-meta .card')).toHaveCount(6);
  });

  test('missing project query shows missing-state message', async ({ page }) => {
    await page.setContent('<h1 id="project-title">Missing project id</h1>');
    await expect(page.locator('#project-title')).toContainText(/Missing project id/i);
  });

  test('invalid project query shows fetch failure state', async ({ page }) => {
    await page.setContent('<h1 id="project-title">Failed to fetch project data</h1>');
    await expect(page.locator('#project-title')).toContainText(/Failed to fetch/i);
  });

  // Practice exercise:
  // 1) Remove .skip
  // 2) For a valid project, assert coverage link points to coverage-audit.json
  test.skip('exercise: check coverage evidence link attribute', async ({ page }) => {
    await page.setContent('<a id="coverage-link" href="/data/projects/qa-automation-template/coverage-audit.json">Coverage</a>');
    await expect(page.locator('#coverage-link')).toHaveAttribute('href', /coverage-audit\.json$/);
  });
});
