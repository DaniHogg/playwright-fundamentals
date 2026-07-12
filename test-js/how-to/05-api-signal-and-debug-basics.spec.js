const { test, expect } = require('@playwright/test');

test.describe('How-To 05: API Signal And Debug Basics', () => {
  test('check HTTP status + key UI signal together', async ({ page }) => {
    await test.step('navigate and verify HTTP success', async () => {
      await page.setContent('<h1>Dashboard</h1>');
      await expect(page.locator('h1')).toHaveText('Dashboard');
    });

    await test.step('verify meaningful content rendered', async () => {
      await page.setContent('<section id="project-cards"><article class="card">Project card</article></section>');
      await expect(page.locator('#project-cards .card').first()).toBeVisible();
    });
  });

  test('capture URL/title as lightweight debug evidence', async ({ page }, testInfo) => {
    await page.setContent('<title>Portfolio</title><h1>Portfolio</h1>');

    // Small debug artifact: helpful when triaging failures in CI.
    const debugSummary = [
      `Final URL: ${page.url()}`,
      `Page title: ${await page.title()}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join('\n');

    await testInfo.attach('debug-summary', {
      body: Buffer.from(debugSummary, 'utf8'),
      contentType: 'text/plain',
    });

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  });

  // Practice exercise:
  // 1) Remove .skip
  // 2) Add your own test.step blocks to split actions/assertions clearly
  test.skip('exercise: write a two-step test for homepage proof strip', async ({ page }) => {
    await test.step('open homepage', async () => {
      await page.setContent('<section id="proof-strip"><p>Passing</p></section>');
    });

    await test.step('assert proof strip is visible', async () => {
      await expect(page.locator('#proof-strip')).toBeVisible();
    });
  });
});
