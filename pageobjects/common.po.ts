import { expect, FrameLocator, Locator, Page } from '@playwright/test';

export class CommonAction {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  sleep(s: number) {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
  }
}

function resolveAfterSeconds(timewait: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, timewait);
  });
}
