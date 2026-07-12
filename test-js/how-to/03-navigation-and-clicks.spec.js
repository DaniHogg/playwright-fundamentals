const { test, expect } = require('@playwright/test');

test.describe('How-To 03: Navigation And Clicks', () => {
  test('click top navigation link and assert URL changed', async ({ page }) => {
    await page.setContent(`
      <button id="about-link" type="button" data-target="/about.html">About Me</button>
      <h1>Home</h1>
      <script>
        document.getElementById('about-link').addEventListener('click', () => {
          document.body.dataset.lastTarget = '/about.html';
        });
      </script>
    `);

    const aboutButton = page.getByRole('button', { name: 'About Me' });
    await expect(aboutButton).toBeVisible();

    await aboutButton.click();

    // In this lesson the goal is to learn click syntax and state changes.
    await expect(page.locator('body')).toHaveAttribute('data-last-target', '/about.html');
  });

  test('open dashboard, click a details link, and verify project page', async ({ page }) => {
    await page.setContent(`
      <button id="details" type="button">View details</button>
      <div id="project-title">Loading...</div>
      <script>
        document.getElementById('details').addEventListener('click', () => {
          document.getElementById('project-title').textContent = 'QA Automation Template';
          document.body.dataset.project = 'qa-automation-template';
        });
      </script>
    `);

    const details = page.getByRole('button', { name: 'View details' }).first();
    await expect(details).toBeVisible();

    await details.click();

    await expect(page.locator('#project-title')).toHaveText('QA Automation Template');
    await expect(page.locator('body')).toHaveAttribute('data-project', 'qa-automation-template');
  });

  // Practice exercise:
  // 1) Remove .skip
  // 2) Click "Automation Projects" and assert the page recorded the action
  test.skip('exercise: add one more nav journey', async ({ page }) => {
    await page.setContent(`
      <button id="projects" type="button">Automation Projects</button>
      <script>
        document.getElementById('projects').addEventListener('click', () => {
          document.body.dataset.lastTarget = '/portfolio.html';
        });
      </script>
    `);
    await page.getByRole('button', { name: 'Automation Projects' }).click();
    await expect(page.locator('body')).toHaveAttribute('data-last-target', '/portfolio.html');
  });
});
