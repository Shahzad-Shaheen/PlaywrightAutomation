// @ts-check
import { test, expect } from '@playwright/test';
import { HomePage } from '../pageobjects/homepage.po';
import { email, password } from '../helper/helper';

test.describe.parallel('Login Page Tests', () => {
  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.openUrl();
  });

  test('KID-270 Error message Email is required is displayed', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.clickContinue();
    // Expect an error message is displayed
    await expect(page.locator('text=Email is Required')).toBeVisible();
  });

  test('KID-271 - Error message with invlaid email is displayed', async ({ page }) => {
    const homePage = new HomePage(page);
    // Enter invalid email address
    await homePage.enterUserEmail("abc123")
    await homePage.clickContinue();

    // Expect an error message is displayed
    await expect(page.locator('text=This email address does not exists')).toBeVisible();
  });

  test('KID-268 - Login form is displayed correctly with all required fields ', async ({ page }) => {
    const homePage = new HomePage(page);

    // Check all enabled field per default
    await expect(homePage.txtBxEmail).toBeVisible();
    await expect(homePage.btnContinue).toBeVisible();

    // click Signup and verify visible and non-visible fields
    await homePage.clickTabSignUp();
    await expect(homePage.txtBxEmail).toBeVisible();
    await expect(homePage.txtBxNewPasswordSignup).toBeVisible();
    await expect(homePage.txtBxConfirmPassword).toBeVisible();
    await expect(homePage.btnSignup).toBeVisible();
  });

  test('KID-272 - Password screen display with valid email', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();

    // click Signup and verify visible and non-visible fields
    await expect(homePage.txtBxForgotPassword).toBeVisible();
    await expect(homePage.txtEnterPassword).toBeVisible();
    await expect(homePage.btnLogin).toBeVisible();
  });

  test('KID-273 - Clicking Back on password screen brings control to Email address', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();

    // Click the Back arrow and Control comes to Email text screen
    await homePage.clickBackFromLogin();
    await expect(homePage.txtBxEmail).toBeVisible();
    await expect(homePage.btnContinue).toBeVisible();
  });

  test('KID-274 -  User is able to successfully login with valid credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    // Verify Dashboard is displayed
    await homePage.clickContinue();
    await homePage.enterNewPassword(password);
    await homePage.clickLogInButton();

    // Verify Dashboard is displayed
    await expect(page.locator('text=My Business')).toBeVisible();
  });

  test('KID-275 - "Invalid Credentials" error message is displayed with wrong password', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();

    // Leave the password blank, and click Login "Invalid Credentials" error message is displayed
    await homePage.clickLogInButton();

    // Expect an error message is displayed
    await expect(page.locator('text=Password is Required')).toBeVisible();

    // Enter invalid password
    await homePage.enterNewPassword("abc");
    await homePage.clickLogInButton();

    // Expect invalid credentials message is displayed 
    await expect(page.locator('text=Invalid Credentials')).toBeVisible();
  });

  test('KID-276 - Forgot password links leads to Change password widget', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();

    // Click the "Forgot password" link
    await homePage.clickForgotPassword();

    // Expect invalid credentials message is displayed 
    await expect(page.locator('text=Forgot password?')).toBeVisible();
    await expect(homePage.txtBxEmail).toBeVisible();
    await expect(homePage.linkLoginInstead).toBeVisible();
    await expect(homePage.txtBxResetPassowrd).toBeVisible();
  });

  test('KID-277 - "Valid Email Required" is displayed when an invalid email is given for password reset', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.clickForgotPassword();

    // Enter an Invalid email like 'tets@kxom' and Enter 'Rest Password' button
    await homePage.enterUserEmail("tets@kxom");
    await homePage.clickResetPassword();

    //Error message "Valid Email is Required" is displayed.
    await expect(page.locator('text=Valid Email is Required')).toBeVisible();
  });

  test('KID-278 - Error Email is Required is displayed when email is not given and Rest password is clicked', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.clickForgotPassword();

    // Leave Email input as blank
    await homePage.clickResetPassword();

    //Error message "Valid Email is Required" is displayed.
    await expect(page.locator('text=Email is Required')).toBeVisible();
  });

  test('KID-279 - Password reset request message is displayed when a valid email is given', async ({ page }) => {
    const homePage = new HomePage(page);
    const resetEmail = 'shahzad.shaheen.riffat+1@kidadvisor.ca';
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(resetEmail);
    await homePage.clickContinue();
    await homePage.clickForgotPassword();

    // Verify reset password is visible
    await homePage.enterUserEmail(resetEmail);
    await expect(homePage.btnRestPassword).toBeVisible();
  });

  test('KID-280 - "Login instead" button from password reset screen leads control to the "Login" page', async ({ page }) => {
    const homePage = new HomePage(page);
    await homePage.clickTabLogin();
    await homePage.enterUserEmail(email);
    await homePage.clickContinue();
    await homePage.clickForgotPassword();

    // Leave Email input as blank
    await homePage.clickLoginInstead();

    //Error message "Valid Email is Required" is displayed.
    await expect(homePage.btnContinue).toBeVisible();
  });
});
