import { test as base, expect } from '@playwright/test';
import { HomePage } from '../pageobjects/homepage.po';
import { getEmailAddress, getConfirmationLink } from '../helper/disposableEmail';
import { SignupPage } from '../pageobjects/signuppage.po';
import { Dashboard } from '../pageobjects/dashboard.po';

let emailAddress: string;
let inboxId: string;
var inboxData: string[];

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

test.describe('Signup Tests', () => {
  //test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');
  test('KID-361 Complete E2E Signup Flow and Connecting the Account to Stripe', async ({ page }) => {
    inboxData = await getEmailAddress(page);
    emailAddress = inboxData[0];
    inboxId = inboxData[1];

    const homePage = new HomePage(page);
    await homePage.openUrl();
    await homePage.clickTabSignUp();
    await homePage.signup(emailAddress, "automation66");
    const verifyLink = await getConfirmationLink(inboxId);
    await page.goto(verifyLink);
    const signupPage = new SignupPage(page);

    // Step-1 Create your Profile section
    await signupPage.selectLogo('./photos/logo.png');
    await signupPage.enterBusinessname('Test business');
    await signupPage.enterAddress('Montreal QC, Canada');
    await signupPage.enterPhone('1111111111');
    await signupPage.enterOneMoreAddressAndPhone('Rue Aristide Boucicaut Vannes, France');
    await signupPage.enterDescription('Activity description');
    await signupPage.enterUrl('https://test.com');
    await signupPage.clickNextOnFirstSection();

    // Step-2 Tell us About your Activity 
    await signupPage.enterActivityTitle('Activity title');
    var categoryList: string[];
    categoryList = ["Amusement park"];
    await signupPage.selectCategories(categoryList);

    signupPage.selectAllSeasons();
    await signupPage.clickNextOnActivityDetailsSecondSection();

    // Step-3 Tell us About Price Activity
    await signupPage.clickNextOnActivityPriceThirdSection();

    // Step-4 Upload Event Pictures
    await signupPage.uploadPictureOne('./photos/logo.png');
    await signupPage.clickNextOnUploadPictures4thSection();
    await signupPage.clickSaveAfterAllActivities();

    // Final Step - Go to Home page and verify that control is to the homepage
    await signupPage.clickReturnToHomePageFromSignup();
    await page.waitForURL('**\/profile');
    await expect(signupPage.titleMyBusiness).toBeVisible();

    await signupPage.setUpStripe();
  });

  test('KID-310 Error messages validation on Signup form', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();
    await homePage.clickTabSignUp();
    await homePage.clickGetStarted();

    // Verify error messages
    await expect(homePage.errorMessageConfirmPassword).toBeVisible();
    await expect(homePage.errorMessageEmail).toBeVisible();
    await expect(homePage.errorMessagePassword).toBeVisible();

    // click Login, Enter Email and verify error messages
    await homePage.clickTabLogin();
    await homePage.clickTabSignUp();
    await homePage.enterUserEmail("abc@hotmail.com");
    await homePage.clickGetStarted();
    await expect(homePage.errorMessageConfirmPassword).toBeVisible();
    await expect(homePage.errorMessageEmail).toBeHidden();
    await expect(homePage.errorMessagePassword).toBeVisible();

    // click Login, Enter Email, Password and verify error message
    await homePage.clickTabLogin();
    await homePage.clickTabSignUp();
    await homePage.enterUserEmail("abc@hotmail.com");
    await homePage.enterPasswordForSignup("test");
    await homePage.clickGetStarted();
    await expect(homePage.errorMessageConfirmPassword).toBeVisible();
    await expect(homePage.errorMessageEmail).toBeHidden();
    await expect(homePage.errorMessagePassword).toBeHidden();
  });

  test('KID-392 Signup scenario with complete "Business Contact" information after Login', async ({ page }) => {
    inboxData = await getEmailAddress(page);
    emailAddress = inboxData[0];
    let password = "automation66";
    inboxId = inboxData[1];

    // Login with the email
    const homePage = new HomePage(page);
    await homePage.openUrl();
    await homePage.clickTabSignUp();
    await homePage.signup(emailAddress, password);
    const verifyLink = await getConfirmationLink(inboxId);
    await page.goto(verifyLink);
    const signupPage = new SignupPage(page);

    // Now logout and sign in again without completing activity steps
    await signupPage.clickLogout();
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(emailAddress);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();

    // Verify Dashboard is displayed
    await expect(page.locator('text=My Business')).toBeVisible();

    // Enter Data on Dashboard
    const businessName = "Test business name";
    const businessUrl = "partner-dev.kidadvisor.ca";
    const businessContact = "Test buisness contact";
    const businessPhone = '11111111111111111';
    const gstNo = '123456';
    const hstNo = '1234567';
    const dashboard = new Dashboard(page);
    await dashboard.selectBusinessLogo('./photos/logo.png');
    await dashboard.enterBusinessName(businessName);
    await dashboard.enterUrl(businessUrl);
    await dashboard.enterBusinessContactName(businessContact);

    await dashboard.enterBusinessContactEmail(emailAddress)
    await dashboard.enterBusinessPhone(businessPhone);
    await dashboard.enterGstNumber(gstNo);
    await dashboard.enterHstNumber(hstNo);
    await dashboard.clickSave();
    await dashboard.clickMyLocations();

    // Now Logout and login in again to verify if data is updated
    await dashboard.clickLogout();
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(emailAddress);
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();
    await page.waitForURL('**\/profile');

    // Verify if the data is saved properly after login on the dashboard
    const attributeToRead = 'value';
    await expect(dashboard.businessContactName).toHaveAttribute(attributeToRead, businessContact);
    await expect(dashboard.businessContactPhone).toHaveAttribute(attributeToRead, businessPhone);
    await expect(dashboard.businessContactEmail).toHaveAttribute(attributeToRead, emailAddress);
    await expect(dashboard.gstNumber).toHaveAttribute(attributeToRead, gstNo);
    await expect(dashboard.hstNumber).toHaveAttribute(attributeToRead, hstNo);
    await expect(dashboard.txtBxUrl).toHaveAttribute(attributeToRead, businessUrl);
    await expect(dashboard.hstNumber).toHaveAttribute(attributeToRead, hstNo);
  });
});