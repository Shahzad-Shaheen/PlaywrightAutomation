// @ts-check
import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pageobjects/homepage.po';
import { email, password } from '../helper/helper';
import { MyAdvertising } from '../pageobjects/advertising.po';

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

test.describe.parallel('Advertising Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();
  });

  test('KID-479 Verify "Advertising" tab works and leads to "shop.kidadvisor.ca" after selecting 1 month package', async ({ page }) => {
    test.skip();
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Add Location
    const advertising = new MyAdvertising(page);
    await advertising.clickAdevrtising();
    let adevertisingPage = await advertising.returnAdvertisingPage();
    await advertising.clickCatalog(adevertisingPage);
    await advertising.clickOneMonthAdDisplay(adevertisingPage);
    await advertising.clickAddToCart(adevertisingPage);
    await advertising.clickCheckout(adevertisingPage);
  });

  test('KID-482 Verify 14 days package, add it to Cart', async ({ page }) => {
     test.skip();
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Add 14 days Product
    const advertising = new MyAdvertising(page);
    await advertising.clickAdevrtising();
    let advertisingPage = await advertising.returnAdvertisingPage();
    await advertising.clickCatalog(advertisingPage);
    await advertising.click14DaysAdDisplay(advertisingPage);
    await advertising.clickAddToCart(advertisingPage);
    await advertising.verifyProduct14Days(advertisingPage);
  });

  test('KID-504 Verify 7 days package, add it to Cart', async ({ page }) => {
    test.skip();
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Add 7 days Product
    const advertising = new MyAdvertising(page);
    await advertising.clickAdevrtising();
    let advertisingPage = await advertising.returnAdvertisingPage();
    await advertising.clickCatalog(advertisingPage);
    await advertising.click7DaysAdDisplay(advertisingPage);
    await advertising.clickAddToCart(advertisingPage);
    await advertising.verifyProduct7Days(advertisingPage);

   // Remove 7 days Product
    await advertising.clickRemoveSelectedProduct(advertisingPage);
    await advertising.verifyCardIsEmpty(advertisingPage);
  });

 test('Verification of 1 month package', async ({ page }) => {
    test.skip();
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');
    const advertising = new MyAdvertising(page);
    await advertising.clickAdevrtising();
    let adevertisingPage = await advertising.returnAdvertisingPage();
    await advertising.clickCatalog(adevertisingPage);
    await advertising.clickOneMonthAdDisplay(adevertisingPage);
    await advertising.clickAddToCart(adevertisingPage);
    await advertising.clickCheckout(adevertisingPage);
  });

});