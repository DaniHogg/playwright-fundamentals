const { test, expect } = require('@playwright/test');

test.describe('How-To 02: Locators And Assertions', () => {
  test('locate a section by id and assert it is visible', async ({ page }) => {
    await page.setContent(`
      <main>
        <section id="proof-strip">
          <p>Passing</p>
          <p>Active project</p>
        </section>
      </main>
    `);

    // locator('#proof-strip') uses a CSS selector.
    // Use this when role-based locator is not practical.
    const proofStrip = page.locator('#proof-strip');

    await expect(proofStrip).toBeVisible();
    await expect(proofStrip).toContainText(/Passing|Failing|Active project/i);
  });

  test('work with a list of elements (count + first item)', async ({ page }) => {
    await page.setContent(`
      <section id="project-cards">
        <article class="card">Card 1</article>
        <article class="card">Card 2</article>
      </section>
    `);

    // This locator may match multiple cards.
    const cards = page.locator('#project-cards .card');

    // first() narrows to one specific element.
    await expect(cards.first()).toBeVisible();

    // count() returns a number, so use plain expect().
    expect(await cards.count()).toBeGreaterThan(0);
  });

  // Practice exercise:
  // 1) Remove .skip
  // 2) Assert the first dashboard card includes "Repository" link text
  test.skip('exercise: add text assertion inside first card', async ({ page }) => {
    await page.setContent(`
      <section id="project-cards">
        <article class="card">Repository link lives here</article>
      </section>
    `);
    const firstCard = page.locator('#project-cards .card').first();
    await expect(firstCard).toContainText(/Repository/i);
  });
});
