## bun:test

We use bun:test for unit testing.

We use `@testing-library/react` for testing React components with `bun:test`.

We don't use `fireEvent`. We use `@testing-library/user-event` for simulating user interactions in Vitest tests. We run `userEvent.setup()` before render.

We have `bun:test` configured to run in a browser-like environment using `happydom`.

We import `it` and `expect` from `bun:test` in each unit test file.

We store Bun unit tests in `/src` alongside the file under test and the test's filename should end with `.test.ts`.

We do NOT use a `describe` block at the top level of the test file.

## Playwright

We use Playwright for end-to-end testing.

We store all Playwright tests in `/tests`.

We name our Playwright test files with the `.spec.ts` extension.

We use Playwright's recommended locators when possible, as documented here: https://playwright.dev/docs/locators#quick-guide
