import { AxiosRequestConfig } from "axios";
import { NextPageContext } from "next";
import { BaseService, Response } from "./BaseService";
import { RegisterFormData, RegisterFormData_API } from "./dtos/RegisterFormData";
import { TokenInfo, TokenInfo_API } from "./dtos/TokenInfo";
import { User, User_API } from "./dtos/User";

export class UserService extends BaseService {
  constructor(ctx?: NextPageContext) {
    super(ctx);
  }

  public register = async (data: RegisterFormData): Promise<User> => {
    const resp: Response<User_API> = await this.post('users/', {data: new RegisterFormData_API(data)});
    return new User(resp.data);
  }

  public profile = async (): Promise<User> => {
    const resp: Response<User_API> = await this.get('users/me');
    return new User(resp.data);
  }
}