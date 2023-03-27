import { expect, Locator, Page } from '@playwright/test';

export class MyAdvertising {
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
  readonly oneMonthAdvertisementOption: string;

  constructor(page: Page) {
    this.page = page;
    this.btnLogout = page.locator('[placeholder="Your Email"]');
    this.btnSave = page.locator('text=Save').nth(1);
    this.btnSaveLocation = page.locator("//button[@type='submit']");
    this.oneMonthAdvertisementOption = '[aria-label="Catalog\\: Catalog"]';
  }

  async clickMyActivities(): Promise<void> {
    await this.page.waitForURL('**\/activities');
  }

  async addLocation(address: string, phoneNumber: string): Promise<void> {
  }

  async editLocation(editedAddress: string): Promise<void> {
  }

  async deleteFirstAddedLocation(locationName: string): Promise<void> {

  }

  async clickSave(): Promise<void> {
    await resolveAfterSeconds(2000);
    await this.btnSave.isVisible();
    await this.btnSave.click();
  }

  async clickAdevrtising(): Promise<void> {
    await this.page.locator('text=Advertising').click();
    await this.page.waitForURL('**\/advertising');
  }

  async returnAdvertisingPage(): Promise<Page> {
    const [page] = await Promise.all([
      this.page.waitForEvent('popup'),
      this.page.locator('button:has-text("Advertising")').click()
    ]);
    return page;
  }

  async clickCatalog(page: Page): Promise<void> {
    await page.locator(this.oneMonthAdvertisementOption).click();
  }

  async clickOneMonthAdDisplay(page: Page): Promise<void> {
    await page.locator('a:has-text("1 month of ad display")').click();
    await expect(page).toHaveURL('https://qatestautomation/products/1-month-of-ad-display');
  }

  async click14DaysAdDisplay(page: Page): Promise<void> {
    await page.locator('a:has-text("14 days of ad display")').click();
    await expect(page).toHaveURL('https://qatestautomation/products/14-days-of-ad-display');
  }

  async click7DaysAdDisplay(page: Page): Promise<void> {
    await page.locator('a:has-text("7 days of ad display")').click();
    await expect(page).toHaveURL('https://qatestautomation/products/7-days-of-ad-display');
  }

  async clickCheckout(page: Page): Promise<void> {
    await page.locator("xpath=//input[@name='checkout']").click();
  }

  async clickAddToCart(page: Page): Promise<void> {
    await page.locator("div.product-form__controls-group.product-form__controls-group--submit > div > button").click();
    await page.locator("xpath=//a[@href='/cart']").first().click();
    await expect(page).toHaveURL('https://qatestautomation/cart');
  }

  async verifyProduct14Days(page: Page): Promise<void> {
    await expect(page.locator("//a[contains(text(),'14 days of ad display')]")).toBeVisible();
  }

  async verifyProduct7Days(page: Page): Promise<void> {
    await expect(page.locator("//a[contains(text(),'7 days of ad display')]")).toBeVisible();
  }

  async verifyCardIsEmpty(page1: Page): Promise<void> {
    await page1.locator('text=Your cart is currently empty.').click();
    await page1.locator('text=Your cart Your cart is currently empty. Enable cookies to use the shopping cart  >> h1').click();
  }

  async clickRemoveSelectedProduct(page1: Page): Promise<void> {
    await page1.locator('text=Remove').click();
  }
}

function resolveAfterSeconds(timewait: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, timewait);
  });
}
