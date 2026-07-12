# Playwright JavaScript How-To Test Series

This folder is a step-by-step refresher for writing basic Playwright tests in JavaScript.

The lessons use small inline HTML examples so you can learn the syntax without depending on a live site.

Run one file at a time in this order:

1. `npx playwright test test-js/how-to/01-first-test.spec.js`
2. `npx playwright test test-js/how-to/02-locators-and-assertions.spec.js`
3. `npx playwright test test-js/how-to/03-navigation-and-clicks.spec.js`
4. `npx playwright test test-js/how-to/04-query-params-and-states.spec.js`
5. `npx playwright test test-js/how-to/05-api-signal-and-debug-basics.spec.js`

Each file includes:

- Working tests with teaching comments.
- A small exercise test marked with `test.skip(...)` so you can unskip and practice.

Tip: after each run, open the HTML report:

- `npx playwright show-report`
