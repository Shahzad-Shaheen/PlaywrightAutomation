// @ts-check
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pageobjects/homepage.po';
import { email, password } from '../helper/helper';
import { MyLocations } from '../pageobjects/mylocations.po';

export const test = base.extend({
  page: async ({page }, use) => {
    const messages: string[] = [];
    page.on('console', (msg) => {
      // Ignore regular log messages; we are only interested in errors.
      if (msg.type() === 'error') {
        messages.push(`[${msg.type()}] ${msg.text()}`);
      }
    });
    // Uncaught (in promise) TypeError + friends are page errors.
    page.on('pageerror', (error) => {
      messages.push(`[${error.name}] ${error.message}`);
    });
    await use(page);
    expect(messages).toStrictEqual([]);
  },
});

test.describe.parallel('Location Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();
  });

  test('KID-475 Location is edited successfully', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Add Location
    const myLocations = new MyLocations(page);
    await myLocations.clickMyLocations();
    let locationName = 'Toronto, ON, Canada';
    await myLocations.addLocation(locationName, '1111111111');
    await expect(page.locator('text=' + locationName + '').first()).toBeVisible();

    // Click edit location pencil
    await myLocations.clickEditLocationIcon(locationName);
    let editedLocation = "Montreal, QC, Canada";
    await myLocations.editLocation(editedLocation);

    // Verify edited Location is visible
    await expect(page.locator('text=' + editedLocation + '').first()).toBeVisible();
  });
});