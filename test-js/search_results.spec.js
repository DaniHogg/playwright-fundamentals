const { test, expect } = require('@playwright/test');

test.describe('Project Lookup Paths', () => {
  test('Playwright project detail route loads', async ({ page }) => {
    await page.goto('/project.html?project=playwright');
    await expect(page.locator('#project-title')).toContainText(/Playwright Automation/i);
    await expect(page.locator('#project-summary')).toContainText(/Completed|Fresh|Stale/i);
  });

  test('project context summary appears for mapped projects', async ({ page }) => {
    await page.goto('/project.html?project=playwright');
    const context = page.locator('#project-context');
    await expect(context).toBeVisible();
    await expect(context).toContainText(/What was tested|Why it matters|Tools/i);
  });
});
