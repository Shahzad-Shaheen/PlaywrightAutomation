import { test, expect } from '@playwright/test';

test.describe.serial('QA Automation Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ page }) => {
  });
  test('Verify that Conntact us form is opened successfully.', async ({ page }) => {
   
  });
});
