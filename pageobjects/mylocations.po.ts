import { Locator, Page, expect } from '@playwright/test';

export class MyLocations {
  readonly page: Page;
  readonly btnLogout: Locator;
  readonly mainLogo: Locator;
  readonly btnSave: Locator;
  readonly btnSaveLocation: Locator;
  readonly submit: Locator;
  readonly myLocations: Locator;
  readonly address: Locator;
  readonly phoneNumber: Locator;
  readonly addLocationBtn: Locator;

  constructor(page: Page) {
    this.page = page;
    this.btnLogout = page.locator('[placeholder="Your Email"]');
    this.btnSave = page.locator('text=Save').nth(1);
    this.btnSaveLocation = page.locator("//button[@type='submit']");
    this.addLocationBtn = page.locator('text=Add Location');
    this.myLocations = page.locator('text=My Locations');
    this.address = page.locator('[placeholder="Address"]');
    this.phoneNumber = page.locator('[placeholder="Phone Number"]');
  }

  async clickMyActivities(): Promise<void> {
    await this.page.waitForURL('**\/activities');
  }

  async addLocation(address: string, phoneNumber: string): Promise<void> {
    await this.addLocationBtn.click();
    await this.address.click();
    await this.address.fill(address);
    await this.page.locator('[class^=LocationForm_addressList__] > li:nth-child(1)').click();
    await this.phoneNumber.click();
    await this.phoneNumber.fill(phoneNumber);
    await this.btnSaveLocation.click();
  }

  async editLocation(editedAddress: string): Promise<void> {
    await this.address.click();
    await this.address.dblclick();
    await this.address.press('ArrowRight');
    await this.address.fill(editedAddress);
    await this.page.locator('[class^=LocationForm_addressList__] > li:nth-child(1)').click();
    await this.btnSaveLocation.click();
  }

  async deleteFirstAddedLocation(locationName: string): Promise<void> {
    let row = this.page.locator('//td[contains(text(), "' + locationName + '")]/ancestor::tr');
    await row.locator('td:nth-child(3) > div > svg:nth-child(2)').click();
  }

  async clickEditLocationIcon(locationName: string): Promise<void> {
    let row = this.page.locator('//td[contains(text(), "' + locationName + '")]/ancestor::tr').first();
    await row.locator('td:nth-child(3) > div > svg:nth-child(1)').click();
  }

  async clickSave(): Promise<void> {
    await this.btnSave.isVisible();
    await this.btnSave.click();
  }

  async clickMyLocations(): Promise<void> {
    await this.myLocations.isVisible();
    await this.myLocations.click();
    await this.page.waitForURL('**\/locations');
  }
}

function resolveAfterSeconds(timewait: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, timewait);
  });
}
