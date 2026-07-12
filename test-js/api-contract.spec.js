const { test, expect } = require('@playwright/test');
const { toSitePath } = require('./site-path');

// Direct API-contract checks against the JSON data endpoints the site's UI
// fetches client-side (see advanced.spec.js / forms.spec.js for the same
// project's coverage-audit.json consumed via the DOM). These use Playwright's
// `request` fixture to hit the endpoints directly, without a browser page,
// so a broken/renamed JSON field is caught even if no UI test happens to
// render it.
test.describe('API Contract: coverage-audit.json', () => {
  test('coverage-audit.json returns the expected schema', async ({ request, baseURL }) => {
    const url = new URL(toSitePath('/data/projects/qa-automation-template/coverage-audit.json'), baseURL).toString();
    const response = await request.get(url);

    expect(response.ok()).toBeTruthy();
    expect(response.headers()['content-type']).toContain('application/json');

    const body = await response.json();
    expect(body.project_id).toBe('qa-automation-template');
    expect(typeof body.run_id).toBe('string');
    expect(typeof body.generated_at).toBe('string');
    expect(body.summary).toEqual(
      expect.objectContaining({
        covered_suites: expect.any(Number),
        not_covered_suites: expect.any(Number),
        unknown_suites: expect.any(Number),
      }),
    );
    expect(Array.isArray(body.covered)).toBeTruthy();
    expect(Array.isArray(body.not_covered)).toBeTruthy();
    expect(Array.isArray(body.unknown)).toBeTruthy();
  });

  test('projects index.json lists the expected projects', async ({ request, baseURL }) => {
    const url = new URL(toSitePath('/data/projects/index.json'), baseURL).toString();
    const response = await request.get(url);

    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(Array.isArray(body.projects)).toBeTruthy();
    expect(body.projects.length).toBeGreaterThan(0);

    const ids = body.projects.map((p) => p.id);
    expect(ids).toContain('qa-automation-template');
  });
});
