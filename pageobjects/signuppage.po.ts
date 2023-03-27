import { Locator, Page, expect } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly btnAccepter: Locator;
  readonly txtBxBusinessName: Locator;
  readonly txtBxAddess: Locator;
  readonly txtBxDescription: Locator;
  readonly txtBxUrl: Locator;
  readonly mainLogo: Locator;
  readonly btnNextFirstSection: Locator;
  readonly labelProfileSavedSuccessfully: Locator;
  readonly btnLogout: Locator;
  readonly txtBxPhone: Locator;
  readonly optionCountryCode: Locator;
  readonly txtBxActivity: Locator;
  readonly optionCategories: Locator;
  readonly btnSave: Locator;
  readonly optionReturnToHomePage: Locator;
  readonly seasonCheckBox: Locator;
  readonly uploadMaxPictures: Locator;
  readonly btnNext: Locator;
  readonly btnSaveUploadPictures: Locator;
  readonly titleMyBusiness: Locator;
  readonly saveNotification: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnSaveUploadPictures = page.locator('div[role="document"] >> text=Save');
    this.titleMyBusiness = page.locator('text=My Business');
    this.btnAccepter = page.locator('button[role="button"]:has-text("Accepter")');
    this.txtBxBusinessName = page.locator('[placeholder="Business Name"]');
    this.txtBxAddess = page.locator('[placeholder="Address"]');
    this.txtBxDescription = page.locator('[placeholder="Business Description"]');
    this.txtBxUrl = page.locator('[placeholder="URL"]');
    this.mainLogo = page.locator('input[name="activityMainImage"]');
    this.btnNextFirstSection = page.locator('#panel1bh-content button:nth-child(1)');
    this.labelProfileSavedSuccessfully = page.locator('text=profileSavedSuccessfully');
    this.btnLogout = page.locator('text=Logout');
    this.txtBxPhone = page.locator('[placeholder="\\(XXX\\) XXX-XXXX"]');
    this.optionCountryCode = page.locator('select[name="addresses\\[0\\]\\.countryCode"]');
    this.txtBxActivity = page.locator('[placeholder="Activity Title"]');
    this.optionCategories = page.locator('div[role="button"]:has-text("Categories")');
    this.btnSave = page.locator('div[role="document"] >> text=Save');
    this.btnNext = page.locator('//button[contains(@class, "becomesteps_nextButtonWrap")]');
    this.optionReturnToHomePage = page.locator('text=Return to Homepage');
    this.seasonCheckBox = page.locator('text=SpringSummerFallWinter >> label');
    this.saveNotification = page.locator('text=Changes Saved');
    this.uploadMaxPictures = page.locator('text=Learn on how to differentiate your business with your picture by clicking hereLe >> input[type="file"]');
  }

  async clickContinue(): Promise<void> {
    await this.btnAccepter.click();
  }

  async clickReturnToHomePage(): Promise<void> {
    await this.optionReturnToHomePage.click();
  }

  async clickSave(): Promise<void> {
    await this.btnSave.click();
  }

  async selectCategories(categoryList: string[]): Promise<void> {
    await this.page.locator('div[role="button"]:has-text("Categories")').click();
    for (let i = 0; i < categoryList.length; i++) {
      await this.page.locator('text=' + categoryList[i] + '').click();
    }
    await this.page.locator('div[role="presentation"] div').first().click();
  }

  async selectAllSeasons(): Promise<void> {
    await this.page.locator('text=SpringSummerFallWinter >> label').first().click();
    await this.page.locator('text=SpringSummerFallWinter >> label').nth(1).click();
    await this.page.locator('text=SpringSummerFallWinter >> label').nth(2).click();
    await this.page.locator('text=SpringSummerFallWinter >> label').nth(3).click();
  }

  async selectCountryCode(code: string): Promise<void> {
    await this.optionCountryCode.selectOption(code);
  }

  async clickLogout(): Promise<void> {
    await this.btnLogout.click();
  }

  async clickLabelSavedSuccessfully(): Promise<void> {
    await this.labelProfileSavedSuccessfully.click();
  }

  async clickNextOnFirstSection(): Promise<void> {
    await this.btnNext.nth(0).click();
  }

  async clickNextOnActivityDetailsSecondSection(): Promise<void> {
    await this.page.getByRole('button', { name: 'Next' }).click();

  }

  async clickNextOnActivityPriceThirdSection(): Promise<void> {
    await this.btnNext.nth(2).click();
  }

  async clickNextOnUploadPictures4thSection(): Promise<void> {
    await this.btnNext.nth(3).click();
  }

  async clickSaveAfterAllActivities(): Promise<void> {
    await this.page.locator('button:has-text("Save")').click();
  }

  async clickReturnToHomePageFromSignup(): Promise<void> {
    await this.page.locator('text=Return to Homepage').click();
  }

  async setUpStripe(): Promise<void> {
    await this.page.getByText('Payments').click();
    await this.page.locator('//button[text()="I accept the above contract"]').click();
    await resolveAfterSeconds(15000);
    await this.page.goto('https://connect.stripe.com/setup/e/acct_1M87T1Qqn4VPEUY0/umCr8XrOFgNF');
    await this.page.locator('//button[text()="Create Stripe Account"]').click();
    await this.page.getByPlaceholder('(506) 234-5678').fill('000 000 0000');
    await this.page.locator('[data-test="phone-entry-submit"]').click();
    await this.page.locator('[data-test="test-mode-fill-button"]').click();
    await this.page.getByLabel('Nonprofit Organization').check();
    await this.page.getByRole('button', { name: 'Continue' }).click();
    await this.page.getByPlaceholder('Company, Inc.').click();
    await this.page.getByPlaceholder('Company, Inc.').fill('test');
    await this.page.getByLabel('Doing business as').click();
    await this.page.getByPlaceholder('Address line 1').click();
    await this.page.getByPlaceholder('Address line 1').fill('test');
    await this.page.getByPlaceholder('Address line 2').click();
    await this.page.getByPlaceholder('Address line 2').fill('test');
    await this.page.getByPlaceholder('City').click();
    await this.page.getByPlaceholder('City').fill('Monteral');
    await this.page.getByRole('combobox', { name: 'Province' }).selectOption('AB');
    await this.page.getByPlaceholder('Postal code').click();
    await this.page.getByPlaceholder('Postal code').fill('T7X0A4');
    await this.page.locator('[data-test="company-submit-button"]').click();
    await this.page.getByPlaceholder('First name').click();
    await this.page.getByPlaceholder('First name').fill('test');
    await this.page.getByPlaceholder('First name').press('Tab');
    await this.page.getByPlaceholder('Last name').fill('test');
    await this.page.locator("input[name='dob-month']").click();
    await this.page.locator("input[name='dob-month']").fill('06');
    await this.page.locator("input[name='dob-day']").click();
    await this.page.locator("input[name='dob-day']").fill('06');
    await this.page.getByPlaceholder('YYYY').click();
    await this.page.getByPlaceholder('YYYY').fill('1984');
    await this.page.getByPlaceholder('Address line 1').click();
    await this.page.getByPlaceholder('Address line 1').fill('test');
    await this.page.getByPlaceholder('Address line 2').click();
    await this.page.getByPlaceholder('Address line 2').fill('test');
    await this.page.getByPlaceholder('City').click();
    await this.page.getByPlaceholder('City').fill('Monteral');
    await this.page.getByPlaceholder('Postal code').click();
    await this.page.getByPlaceholder('Postal code').fill('T7X0A4');
    await this.page.getByRole('combobox', { name: 'Province' }).selectOption('AB');
    resolveAfterSeconds(2000);
    await this.page.locator('[data-test="bizrep-submit-button"]').click();
    resolveAfterSeconds(2000);
    await this.page.locator('[data-test="test-mode-fill-button"]').click();
    await this.page.locator('[data-test="requirements-index-done-button"]').click();
    await this.page.getByText('Your Stripe account is now linked to KidAdvisor. A sales representative will con').click();
    await this.page.getByRole('button', { name: 'Logout' }).click();
  }

  async uploadPictureOne(filepath: string): Promise<void> {
    await this.uploadMaxPictures.first().setInputFiles(filepath);
    await this.btnSaveUploadPictures.click();

  }

  async enterBusinessname(businessName: string): Promise<void> {
    await this.txtBxBusinessName.click;
    await this.txtBxBusinessName.fill(businessName);
  }

  async enterActivityTitle(activity: string): Promise<void> {
    await this.txtBxActivity.click();
    await this.txtBxActivity.fill(activity);
  }

  async enterPhone(businessPhone: string): Promise<void> {
    await this.txtBxPhone.click();
    await this.txtBxPhone.fill(businessPhone);
  }

  async enterUrl(url: string): Promise<void> {
    await this.txtBxUrl.click();
    await this.txtBxUrl.fill(url);
  }

  async enterDescription(businessDescription: string): Promise<void> {
    await this.txtBxDescription.click();
    await this.txtBxDescription.fill(businessDescription);
  }

  async selectBusinessLogo(businessDescription: string): Promise<void> {
    await this.txtBxDescription.click();
    await this.txtBxDescription.fill(businessDescription);
  }

  async enterAddress(address: string): Promise<void> {
    await this.txtBxAddess.click();
    await this.txtBxAddess.fill(address);
    await this.page.locator('text=' + address + '').click();
  }

  async enterOneMoreAddressAndPhone(address: string): Promise<void> {
    await this.page.locator('text=+Add one more address').click();
    await this.page.locator('input[name="addresses\\[1\\]\\.address"]').click();
    await this.page.locator('input[name="addresses\\[1\\]\\.address"]').fill(address);
    await this.page.locator('text=' + address + '').click();
    await this.page.locator('[placeholder="\\(XXX\\) XXX-XXXX"]').nth(1).click();
    await this.page.locator('[placeholder="\\(XXX\\) XXX-XXXX"]').nth(1).fill('1111111111');
  }

  async selectLogo(address: string): Promise<void> {
    await this.mainLogo.setInputFiles(address);
  }

  async pause() {
    await this.page.pause();
  }

}

function resolveAfterSeconds(timewait: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, timewait);
  });
}
