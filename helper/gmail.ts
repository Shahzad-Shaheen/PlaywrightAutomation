import { Constant } from "./constant";

export default class GmailHelper {

  async checkInbox(emailTo: string, emailFrom: string, subject: string) {
    const path = require("path");
    const gmail = require("gmail-tester");
    const email = await gmail.check_inbox(
      path.resolve(Constant.resourcePath, "credentials.json"),
      path.resolve(Constant.resourcePath, "token.json"),
      {
        subject: subject,
        from: emailFrom,
        to: emailTo,
        wait_time_sec: 20,
        max_wait_time_sec: 120,
        include_body: true
      }
    );
    if (email) {
      console.log("Email was found!");
    } else {
      console.log("Email was not found!");
    }
  }

  async getVerifyLink(emailTo: string): Promise<string> {
    const path = require("path");
    const gmail = require("gmail-tester");
    const email = await gmail.check_inbox(
      path.resolve(Constant.resourcePath, "credentials.json"),
      path.resolve(Constant.resourcePath, "token.json"),
      {
        subject: "Confirm your email account!",
        from: "info@kidadvisor.ca",
        to: emailTo,
        wait_time_sec: 20,
        max_wait_time_sec: 120,
        include_body: true
      }
    );
    if (email) {
      const html = email[0].body.html.toString();
      return html.substring(html.indexOf('https://qatestautomation/email-confirmed/'), html.indexOf('" target="_blank" style="text-decoration:none; color:#ffffff; line-height:42px; display:block;">CONFIRM EMAIL'));
    } else {
      console.log("Email was not found!");
    }
    return "";
  }
}