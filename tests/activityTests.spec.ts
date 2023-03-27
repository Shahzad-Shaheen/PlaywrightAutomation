// @ts-check
import { test as base, expect } from '@playwright/test';
import { faker } from "@faker-js/faker";
import { HomePage } from '../pageobjects/homepage.po';
import { email, password } from '../helper/helper';
import { MyActivities } from '../pageobjects/myactivities.po';
import { getSpecialString } from '../helper/uniqueStr';
var locationValue = 'Montreal, QC, Canada';

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

test.describe.parallel('Activity Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();
  });

  test('KID-413 Activity is added successfully with all the fields.', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Click My Activities
    const myActivities = new MyActivities(page);
    await myActivities.clickMyActivities();

    // Click Add an Activity and enter details
    await myActivities.clickAddAnActivity();
    var activityname = getSpecialString('Test Activity');
    await myActivities.enterActivityTitle(activityname);

    // Select Categories data
    await myActivities.selectVariousCategories();

    // Enter description
    var activityDescription = getSpecialString('Activity Description' + faker.name.jobDescriptor());
    await myActivities.enterActivityDescription(activityDescription);

    // Select Location
    await myActivities.selectLocation(locationValue);

    //Select Profile Data by moving sliders
    await myActivities.selectProfileData();

    // Select Season Data
    await myActivities.selectAllSeasons();

    // Select Calander Data
    await myActivities.selectCalanderData();

    // Select Activity Logo
    await myActivities.selectActivityLogoLogo('./photos/logo.png');

    // Click Save
    await myActivities.clickSaveContrastChanges();

    // Add price
    await myActivities.enterPrice("testprice", "test price description", "50");
    await myActivities.saveActivityDetails();

    // Verify Activity name is added properly
    await expect(page.locator('text=' + activityname + '')).toBeVisible();

    // Delete an Activity
    await myActivities.deleteAnActivity();
  });

  test('KID-452 Edit Activity and presence of link is verified successfully.', async ({ page }) => {
    // Add a fresh Activity
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');
    const myActivities = new MyActivities(page);
    await myActivities.clickMyActivities();

   // Verify That Activity Link is displayed
    await myActivities.clickEditActvityPencil();
    await expect(page.locator('div[class*="CreatePartnerProfile_anchor__"]')).toBeVisible();

    // Edit the Activity
    let activityEditName = getSpecialString('Test Activity Edit');
    await myActivities.editActivity(activityEditName);

    // Verify Activity name is added properly
    await expect(page.locator('text=' + activityEditName + '')).toBeVisible();
  });

  test('KID-461 Price delete on Activity is done successfully.', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');
    const myActivities = new MyActivities(page);
    await myActivities.clickMyActivities();
    await myActivities.clickAddAnActivity();
    var activityname = getSpecialString('Test Activity');
    await myActivities.enterActivityTitle(activityname);
    await myActivities.selectVariousCategories();

    // Enter Activity Price and save it
    await myActivities.enterPrice("testprice", "test price description", "50");

    // Delete the Activity price
    await myActivities.deletePrice();

    // Verify price has been deleted
    await expect(page.locator('text=No price yet for this activity')).toBeVisible();
  });

  test('KID-551 Changes Save dialog on Edit Activity.', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');
    const myActivities = new MyActivities(page);
    await myActivities.clickMyActivities();

    // click first activity presenton the board
    await myActivities.clickFirstActivityPresentOnBoard();
    var activityDescription = getSpecialString('Activity Description');
    await myActivities.enterActivityDescription(activityDescription);

    // click Cancel and 'No' on the confirmation dialog 
    await myActivities.clickCancel();
    await myActivities.clickNoOnConfirmDialog();

    // click Cancel and 'Yes' on the confirmation dialog 
    await myActivities.clickCancel();
    await myActivities.clickYesOnConfirmDialog();

    // Verify control comes on the My Activities page
    await expect(page.locator('//*[contains(@class, "CreatePartnerProfile_guidelineHead__")]')).toBeVisible();
  });
});