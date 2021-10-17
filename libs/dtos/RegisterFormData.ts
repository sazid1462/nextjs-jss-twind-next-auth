export class RegisterFormData_API {
  username: string
  password: string
  email: string
  full_name: string

  constructor(data: RegisterFormData) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.full_name = data.fullName;
  }
}

export class RegisterFormData {
  username: string
  password: string
  email: string
  fullName: string

  constructor(data: RegisterFormData_API) {
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.fullName = data.full_name;
  }
}