import { Locator, Page, expect } from '@playwright/test';

export class MyActivities {
  readonly page: Page;
  readonly btnLogout: Locator;
  readonly mainLogo: Locator;
  readonly txtBxBusinessName: Locator;
  readonly txtBxUrl: Locator;
  readonly businessContactName: Locator;
  readonly businessContactPhone: Locator;
  readonly businessContactEmail: Locator;
  readonly gstNumber: any;
  readonly hstNumber: any;
  readonly btnSave: Locator;
  readonly updateSuccessfully: Locator;
  readonly myLocations: Locator;
  readonly activityTitle: Locator;
  readonly addAnActivity: Locator;
  readonly myActivities: Locator;
  readonly activityDescription: Locator;
  readonly seasonCheckBox: Locator;
  readonly profileInputCalander: Locator;
  readonly addPrice: Locator;
  readonly priceTitle: Locator;
  readonly priceDescription: Locator;
  readonly priceValueTxtBx: Locator;
  readonly activityTitleAdded: Locator;
  readonly btnSaveActivity: Locator;
  readonly profileInputCalanderEndDate: Locator;
  readonly profileInputCalanderStartDate: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnLogout = page.locator('[placeholder="Your Email"]');
    this.activityTitleAdded = page.locator('text=Test Activity');
    this.mainLogo = page.locator('input[name="images\\[0\\]\\.path"]');
    this.txtBxBusinessName = page.locator('[placeholder="Business Name"]');
    this.profileInputCalanderEndDate = page.locator('//input[@placeholder="End Date"]/following-sibling::span');
    this.profileInputCalanderStartDate = page.locator('//input[@placeholder="Start Date"]/following-sibling::span');
    this.businessContactName = page.locator('[placeholder="Business Contact Name"]');
    this.businessContactPhone = page.locator('[placeholder="Business Contact Phone"]');
    this.activityDescription = page.locator('textarea[name="activityDescription"]');
    this.activityDescription = page.locator('textarea[name="activityDescription"]');
    this.btnSave = page.locator('text=Save').nth(1);
    this.btnSaveActivity = page.locator("//button[@type='submit']");
    this.updateSuccessfully = page.locator('text=Updated Successfully');
    this.myLocations = page.locator('text=My Locations');
    this.activityTitle = page.locator('[placeholder="Activity Title"]');
    this.addAnActivity = this.page.locator('text=Add an Activity');
    this.myActivities = this.page.locator('text=My Activities');
    this.addPrice = page.locator('[aria-label="Add"]');
    this.priceTitle = page.locator('[placeholder="Price Title"]');
    this.priceDescription = page.locator('[placeholder="Price Description"]');
    this.priceValueTxtBx = page.locator('[placeholder="Price"]');
    this.seasonCheckBox = page.locator('label');
  }

  async clickMyActivities(): Promise<void> {
    await this.myActivities.click();
    await this.page.waitForURL('**\/en/activities');
  }

  async editActivity(activityEditName: string): Promise<void> {
    await this.page.getByPlaceholder('Activity Title').click();
    await this.page.getByPlaceholder('Activity Title').fill(activityEditName);
    await this.page.getByRole('button', { name: 'Save' }).click();
  }

  async clickEditActvityPencil(): Promise<void> {
    await this.page.locator('path').first().click();
  }

  async clickFirstActivityPresentOnBoard(): Promise<void> {
    await this.page.locator('path').first().click();
  }

  async clickAddAnActivity(): Promise<void> {
    await this.addAnActivity.click();
  }

  async clickNoOnConfirmDialog(): Promise<void> {
    await this.page.locator('//button[contains(@class, "LocationForm_cancel__")]').click();
  }

  async clickYesOnConfirmDialog(): Promise<void> {
    await this.page.locator('//button[contains(@class, "LocationForm_confirm__")]').click();
  }

  async clickCancel(): Promise<void> {
    await this.page.getByRole('button', { name: 'Cancel' }).click();
  }

  async selectActivityLogoLogo(logoPath: string): Promise<void> {
    await this.mainLogo.setInputFiles(logoPath);
    await this.page.locator('[class^=col-md-] > div > div > div:nth-child(2) > .MuiSlider-root > .MuiSlider-rail').first().click();
  }

  async getElementByExactDisplayText(text: string): Promise<Locator> {
    return await this.page.locator('[placeholder="' + text + '"]');
  }

  async enterActivityTitle(activityTitle: string): Promise<void> {
    await this.activityTitle.click();
    await this.activityTitle.fill(activityTitle);
  }

  async selectVariousCategories(): Promise<void> {
    await this.page.locator('text=Categories').click();
    await this.page.locator('.MuiButtonBase-root.MuiListItem-root.MuiMenuItem-root.activity-info-category').nth(0).click();
    await this.page.locator('div[role="presentation"] div').first().click();
  }

  async selectLocation(location: string): Promise<void> {
    await this.page.locator('div[role="button"]:has-text("My Locations")').click();
    await this.page.locator('text=' + location + '').nth(0).click();
  }

  async enterActivityDescription(description: string): Promise<void> {
    await this.activityDescription.click();
    await this.activityDescription.fill(description);
    await this.activityDescription.click();
  }

  async saveActivityDetails(): Promise<void> {
    resolveAfterSeconds(4000);
    await this.btnSaveActivity.isVisible();
    await this.btnSaveActivity.click();
    await this.page.waitForLoadState();
    resolveAfterSeconds(4000);
    await this.page.reload();
    resolveAfterSeconds(4000);
  }

  async enterPrice(priceTitle: string, priceDescription: string, priceValue: string): Promise<void> {
    await this.addPrice.click();
    await this.priceTitle.click();
    await this.priceTitle.fill(priceTitle);
    await this.priceTitle.press('Tab');
    await this.priceDescription.fill(priceDescription);
    await this.priceDescription.press('Tab');
    await this.priceValueTxtBx.fill(priceValue);
    await this.priceValueTxtBx.click();
    await this.page.locator('[aria-label="Save"]').click();
    resolveAfterSeconds(4000);
  }

  async deletePrice(): Promise<void> {
    await this.page.locator('[aria-label="Delete"]').click();
    resolveAfterSeconds(2000);
    await this.page.locator('[aria-label="Save"]').click();
    resolveAfterSeconds(2000);
    await this.page.locator('text=No price yet for this activity').click();
  }


  async deleteAnActivity(): Promise<void> {
    await this.page.reload();
    resolveAfterSeconds(2000);
    await this.page.locator('[class^=CreatePartnerProfile_actionButton__] > svg:nth-child(2)').first().waitFor();
    let size = await this.page.locator('[class^=CreatePartnerProfile_actionButton__] > svg:nth-child(2)').count();
    console.log("Activity present: " + size);
    if (size > 2) {
      await this.page.locator('[class^=CreatePartnerProfile_actionButton__] > svg:nth-child(2)').first().click();
      resolveAfterSeconds(2000);
      await this.page.reload();
      resolveAfterSeconds(2000);
    }
  }

  async selectProfileData(): Promise<void> {
    await this.page.locator('div:nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').first().clear();
    await this.page.locator('div:nth-child(3) > .MuiInputBase-root > .MuiInputBase-input').first().fill("15");
  }

  async selectAllSeasons(): Promise<void> {
    await this.seasonCheckBox.first().click();
    await this.seasonCheckBox.nth(1).click();
    await this.seasonCheckBox.nth(2).click();
    await this.seasonCheckBox.nth(3).click();
  }

  async selectCalanderData(): Promise<void> {
    const currentDate = new Date();
    const endDay = currentDate.getDay() + 5;
    const currentDay = currentDate.getDay();
    await this.profileInputCalanderStartDate.click();
    await this.page.locator('//div[text()="' + currentDay + '"]').first().click();
    await this.profileInputCalanderEndDate.click();
    await this.page.locator('//div[text()="' + endDay + '"]').first().click();
  }

  async clickSaveContrastChanges(): Promise<void> {
    await resolveAfterSeconds(2000);
    await this.btnSave.isVisible();
    await this.btnSave.click();
  }

  async clickSave(): Promise<void> {
    await resolveAfterSeconds(2000);
    await this.btnSave.isVisible();
    await this.btnSave.click();
  }

  async clickMyLocations(): Promise<void> {
    await this.myLocations.isVisible();
    await this.myLocations.click();
  }
}

function resolveAfterSeconds(timewait: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, timewait);
  });
}
