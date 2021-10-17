export class User_API {
  _id: string
  username: string
  password: string
  email: string
  full_name: string
  disabled: boolean

  constructor(data: User) {
    this._id = data.id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.full_name = data.fullName;
    this.disabled = data.disabled;
  }
}

export class User {
  id: string
  username: string
  password: string
  email: string
  fullName: string
  disabled: boolean

  constructor(data: User_API) {
    this.id = data._id;
    this.username = data.username;
    this.password = data.password;
    this.email = data.email;
    this.fullName = data.full_name;
    this.disabled = data.disabled;
  }
}