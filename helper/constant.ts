export class Constant {
  public static readonly resourcePath = 'resources/';
  public static readonly emailAlias = 'playwrighttester';
  public static readonly passwordGmail = 'bl@ckr0ck';
  public static readonly defaultPassword = 'Abc12345';
  public static readonly longWaitElementVisible = 50 * 1000;
  public static readonly existEmail = 'playwrighttester@gmail.com';
  public static readonly invalidEmail = 'playwrighttester';
}

export type UserInfo = {
  name: string;
  address: string;
  email: string;
  password: string;
  phone: string;
  myInterests: [];
  smsNotification: boolean;
  pushNotification: boolean;
  emailNotification: boolean;
}