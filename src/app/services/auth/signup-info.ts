export class SignUpInfo {
  name: string;
  username: string;
  email: string;
  role: string[];
  phoneNumber: string;
  password: string;

  constructor(
    name: string,
    username: string,
    email: string,
    phoneNumber: string,
    password: string
  ) {
    this.name = name;
    this.username = username;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.password = password;
    this.role = ["user"];
  }
}
