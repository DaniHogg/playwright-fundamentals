const { test, expect } = require('@playwright/test');

// Lesson 1: The minimum structure of a Playwright test file.
// - test.describe groups related tests.
// - test defines one runnable test case.
// - expect performs assertions.
test.describe('How-To 01: First Test', () => {
  test('open homepage and check title + heading', async ({ page }) => {
    // page is a built-in Playwright fixture.
    // It represents a browser tab that is fresh for this test.

    // setContent builds a tiny HTML page right inside the test.
    // This keeps the lesson reliable even without a live server.
    await page.setContent(`
      <!doctype html>
      <html lang="en">
        <head>
          <title>Daniel Hogg QA Automation Portfolio</title>
        </head>
        <body>
          <main>
            <h1>Automation Portfolio</h1>
          </main>
        </body>
      </html>
    `);

    // toHaveTitle waits/retries automatically until timeout.
    // Regex keeps assertion flexible to small text changes.
    await expect(page).toHaveTitle(/Daniel Hogg|QA Automation/i);

    // getByRole is preferred because it mirrors how users and assistive
    // tech discover elements.
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/automation/i);
  });

  test('check the page returns a successful HTTP response', async ({ page }) => {
    // In a beginner lesson, the useful part is understanding assertions.
    // Here we verify the page has the expected element after rendering.
    await page.setContent('<h1>Loaded successfully</h1>');
    await expect(page.locator('h1')).toHaveText('Loaded successfully');
  });

  // Practice exercise:
  // 1) Remove .skip
  // 2) Assert the "About Me" nav link is visible
  test.skip('exercise: find a navigation link by role', async ({ page }) => {
    await page.setContent('<a href="/about.html">About Me</a>');
    await expect(page.getByRole('link', { name: 'About Me' })).toBeVisible();
  });
});
