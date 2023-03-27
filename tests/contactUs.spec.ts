import { test, expect, Page } from '@playwright/test';

test.describe.serial('QA Automation Tests', () => {
  test.use({ storageState: { cookies: [], origins: [] } });
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });
  test('Verify that Conntact us form is opened successfully. @smoketest', async ({ page }) => {
    await page.getByRole('link', { name: 'About', exact: true }).click();
    await page.getByRole('link', { name: 'Demo Test Automation Website' }).click();
    await page.getByRole('link', { name: 'Contact Us' }).click();
    await page.getByLabel('First Name(required)').click();
    await page.getByLabel('First Name(required)').fill('Tes Demo');
    await page.getByText('Male', { exact: true }).click();
    await page.getByLabel('Last Name(required)').click();
    await page.getByLabel('Last Name(required)').fill('Test1');
    await page.getByLabel('Email(required)').click();
    await page.getByLabel('Email(required)').fill('test@test.io');
    await page.getByLabel('Phone').click();
    await page.getByLabel('Phone').fill('+4917623456778');
    await page.locator('[data-test="contact-form"]').getByLabel('Website').click();
    await page.locator('[data-test="contact-form"]').getByLabel('Website').fill('https://qatestautomation.com');
    await page.getByLabel('Message').click();
    await page.getByLabel('Message').fill('Hi, This is for testing purpose.');
  });
});
