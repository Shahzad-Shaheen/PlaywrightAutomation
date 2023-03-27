import { test as base, Locator, Page, expect } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly btnContinue: Locator;
  readonly txtBxEmail: Locator;
  readonly btnSignup: Locator;
  readonly txtBxCreatePassword: Locator;
  readonly txtBxConfirmPassword: Locator;
  readonly btnSignUp: Locator;
  readonly tabSignUp: Locator;
  readonly txtEnterPassword: Locator;
  readonly txtBxForgotPassword: Locator;
  readonly txtBxResetPassowrd: Locator;
  readonly linkLoginInstead: Locator;
  readonly btnLogin: Locator;
  readonly backFromLogin: Locator;
  readonly txtBxEnterNewPassword: Locator;
  readonly txtBxCreateAPassword: Locator;
  readonly txtBxCreateNewPassword: Locator;
  readonly tabLogin: Locator;
  readonly btnRestPassword: Locator;
  readonly confirmPassword: Locator;
  readonly getStarted: Locator;
  readonly txtBxNewPasswordSignup: Locator;
  readonly labelConfirmYourAccount: Locator;
  readonly labelVerifyyourEmailAddress: Locator;
  readonly errorMessageEmail: Locator;
  readonly errorMessagePassword: Locator;
  readonly errorMessageConfirmPassword: Locator;
  readonly resendEmail: Locator;

  constructor(page: Page) {
    page.on('pageerror', exception => {
      console.log(`Uncaught exception: "${exception}"`);
    });
    page.on("pageerror", (err) => {
      console.log("Error on page")
      console.log(err.message)
      expect(err.message).not.toBeDefined();
    })

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
    expect(messages).toStrictEqual([]);

    this.page = page;
    this.btnContinue = page.locator('text=Continue');
    this.btnRestPassword = page.locator('text=Reset password');
    this.txtBxEmail = page.locator('input[name="UserEmail"]');
    this.tabLogin = page.locator('text=Log In');
    this.btnSignup = page.locator('button[class*="Signup_signupButton"]');
    this.txtBxCreateNewPassword = page.locator('[placeholder="Create new password"]');
    this.txtBxCreateAPassword = page.locator('[placeholder="Password"]');
    this.txtBxEnterNewPassword = page.locator('[placeholder="Create a Password"]');
    this.txtBxNewPasswordSignup = page.locator('[placeholder="Create a password"]');
    this.txtBxConfirmPassword = page.locator('[placeholder="Confirm your password"]');
    this.btnSignUp = page.locator('button:has-text("Sign up")');
    this.btnLogin = page.locator('button:has-text("Login")');
    this.tabSignUp = page.locator('text=Sign up');
    this.txtEnterPassword = page.locator('input[name="password"]');
    this.txtBxForgotPassword = page.locator('a:has-text("Forgot Password")');
    this.txtBxResetPassowrd = page.locator('text=Reset password');
    this.linkLoginInstead = page.locator('form div:has-text("Log in instead")');
    this.backFromLogin = page.locator('svg[class*="Signup_backButton"]');
    this.confirmPassword = page.locator('[placeholder="Confirm your password"]');
    this.getStarted = page.locator('text=Get Started !');
    this.labelConfirmYourAccount = page.locator('text=Please confirm your account!');
    this.errorMessagePassword = page.locator('text=Password is Required');
    this.errorMessageEmail = page.locator('text=Email Required');
    this.errorMessageConfirmPassword = page.locator('text=Confirm Password');
    this.labelVerifyyourEmailAddress = page.locator('text=Please verify your email address to activate your account.');
    this.resendEmail = page.locator('text=Resend Email');
  }

  async clickContinue(): Promise<void> {
    await this.btnContinue.click();
  }

  async clickForgotPassword(): Promise<void> {
    await this.txtBxForgotPassword.click();
  }

  async signup(email: string, password: string): Promise<void> {
    await console.log("Email Address: " + email);
    await this.txtBxEmail.fill(email);
    await this.txtBxEmail.press('Tab');
    await this.enterPasswordForSignup(password);
    await this.enterConfirmPassword(password);
    await this.clickGetStarted();
    await this.page.waitForURL('**\/confirm-email');
    await this.labelConfirmYourAccount.click();
    await this.labelVerifyyourEmailAddress.click();
    await this.resendEmail.click();
  }

  async enterConfirmPassword(password: string): Promise<void> {
    await this.confirmPassword.fill(password);
  }

  async pause() {
    await this.page.pause();
  }

  async clickGetStarted(): Promise<void> {
    await this.getStarted.click();
  }

  async clickSignUp(): Promise<void> {
    await this.btnSignup.click();
  }

  async clickBackFromLogin(): Promise<void> {
    await this.backFromLogin.click();
  }

  async clickTabSignUp(): Promise<void> {
    await this.tabSignUp.click();
  }

  async clickTabLogin(): Promise<void> {
    await this.tabLogin.click();
  }

  async enterUserEmail(userEmail: string): Promise<void> {
    await this.txtBxEmail.fill(userEmail);
  }

  async clickResetPassword(): Promise<void> {
    await this.btnRestPassword.click();
  }

  async clickLoginInstead(): Promise<void> {
    await this.linkLoginInstead.click();
  }

  async enterCreateNewPassword(userPassword: string): Promise<void> {
    await this.txtBxCreatePassword.fill(userPassword);
  }

  async enterPasswordForSignup(userPassword: string): Promise<void> {
    await this.txtBxNewPasswordSignup.waitFor({ state: 'visible' });
    await this.txtBxNewPasswordSignup.click();
    await this.txtBxNewPasswordSignup.fill(userPassword);
  }

  async enterNewPassword(password: string): Promise<void> {
    await this.txtBxCreateAPassword.waitFor({ state: 'visible' });
    await this.txtBxCreateAPassword.click();
    await this.txtBxCreateAPassword.fill(password);
  }

  async openUrl(): Promise<void> {
    await this.page.goto('./', { timeout: 90 * 1000 });
  }

  async verifyTitlePage(title: string): Promise<void> {
    await expect(this.page).toHaveTitle(title);
  }

  async clickLogInButton(): Promise<void> {
    await expect(this.btnLogin).toBeVisible()
    await this.btnLogin.click();
  }

}
