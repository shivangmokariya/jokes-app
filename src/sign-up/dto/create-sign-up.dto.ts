export class CreateSignUpDto {
  email: string;
  password: string;
  cPassword: string;
}
export class CreateLoginDto {
  static cPassword: string;
  static password: string;
  static email: string;
  _id: string;
  save: any;
}
export class Data {
  password: string;
  cPassword: string;
}
