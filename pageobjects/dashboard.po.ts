import { Locator, Page, expect } from '@playwright/test';

export class Dashboard {
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

  constructor(page: Page) {
    this.page = page;
    this.btnLogout = page.locator('[placeholder="Your Email"]');
    this.mainLogo = page.locator('input[name="activityMainImage"]');
    this.txtBxBusinessName = page.locator('[placeholder="Business Name"]');
    this.txtBxUrl = page.locator('[placeholder="URL"]');
    this.businessContactName = page.locator('[placeholder="Business Contact Name"]');
    this.businessContactPhone = page.locator('[placeholder="Business Contact Phone"]');
    this.businessContactEmail = page.locator('[placeholder="Business Contact Email"]');
    this.gstNumber = page.locator('[placeholder="GST Number"]');
    this.hstNumber = page.locator('[placeholder="HST Number"]');
    this.btnSave = page.locator('text=Save');
    this.updateSuccessfully = page.locator('text=Updated Successfully');
    this.myLocations = page.locator('text=My Locations');
  }

  async clickLogout(): Promise<void> {
    await this.btnLogout.isVisible();
      await this.page.locator('text=Logout').click();
  }

  async selectBusinessLogo(logoPath: string): Promise<void> {
    await this.mainLogo.setInputFiles(logoPath);
  }

  async enterBusinessName(businessName: string): Promise<void> {
    await this.txtBxBusinessName.click();
    await this.txtBxBusinessName.fill(businessName);
  }

  async enterBusinessContactName(businessName: string): Promise<void> {
    await this.businessContactName.click();
    await this.businessContactName.fill(businessName);
  }

  async enterUrl(url: string): Promise<void> {
    await this.txtBxUrl.click();
    await this.txtBxUrl.fill(url);
  }

  async enterBusinessContactEmail(businessEmail: string): Promise<void> {
    await this.businessContactEmail.click();
    await this.businessContactEmail.fill(businessEmail);
  }

  async enterBusinessPhone(businessPhone: string): Promise<void> {
    await this.businessContactPhone.click();
    await this.businessContactPhone.fill(businessPhone);
  }

  async enterGstNumber(gstNumber: string): Promise<void> {
    await this.gstNumber.click();
    await this.gstNumber.fill(gstNumber);
  }

  async enterHstNumber(hstNumber: string): Promise<void> {
    await this.hstNumber.click();
    await this.hstNumber.fill(hstNumber);
  }

  async clickSave(): Promise<void> {
    await resolveAfterSeconds(2000);
    await this.btnSave.isVisible();
    await this.btnSave.click();
    await this.updateSuccessfully.click();
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
