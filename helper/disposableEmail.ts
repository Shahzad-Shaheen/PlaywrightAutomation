import { expect, Page } from '@playwright/test';
import MailSlurp from "mailslurp-client";

const apiKey = '9eba9dfc9f399b83ed8563448506e09638ed5fec2f7435fdad2a9805bb0fcc61'
const mailslurp = new MailSlurp({ apiKey })

export async function getEmailAddress(page: Page): Promise<string[]> {

    expect(apiKey).toBeDefined();

    // load playground app
    await page.goto("https://playground.mailslurp.com");
    await page.click('[data-test="sign-in-create-account-link"]');

    // create a new inbox
    const password = "test-password"
    const { id, emailAddress } = await mailslurp.createInbox()

    // fill sign up form
    await page.fill('input[name=email]', emailAddress);
    await page.fill('input[name=password]', password);
    await page.click('[data-test="sign-up-create-account-button"]');

    // wait for verification code
    let email = await mailslurp.waitForLatestEmail(id)

    // extract the confirmation code (so we can confirm the user)
    const code = /([0-9]{6})$/.exec(email.body)[1];

    // enter confirmation code
    await page.fill('[data-test="confirm-sign-up-confirmation-code-input"]', code);
    await page.click('[data-test="confirm-sign-up-confirm-button"]');

    // fill out username (email) and password
    await page.fill('[data-test="username-input"]', emailAddress);
    await page.fill('[data-test="sign-in-password-input"]', password);
    // submit
    await page.click('[data-test="sign-in-sign-in-button"]');
    await page.waitForSelector("[data-test='greetings-nav']")

    await mailslurp.emptyInbox(id);
    return await new Array(emailAddress, id);
}

export async function getConfirmationLink(id: string): Promise<string> {
    let email = await mailslurp.waitForLatestEmail(id, 180000, true)
    let receivedLinks = await mailslurp.emailController.getEmailLinks({
        emailId: email.id!!,
    });

    console.log(receivedLinks.links);
    let confrimlink;
    const iterator = receivedLinks.links.values();

    for (const value of iterator) {
        if (value.includes('email-confirmed')) {
            confrimlink = value;
        }
    }
    return await confrimlink;
}