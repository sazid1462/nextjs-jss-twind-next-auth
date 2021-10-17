import { AxiosRequestConfig } from "axios";
import { NextPageContext } from "next";
import { BaseService, Response } from "./BaseService";
import { LoginFormData } from "./dtos/LoginFormData";
import { TokenInfo, TokenInfo_FromAPI } from "./dtos/TokenInfo";

export class AuthService extends BaseService {
  constructor(ctx?: NextPageContext) {
    super(ctx);
  }

  public login = async (data: LoginFormData): Promise<TokenInfo> => {
    const params = new URLSearchParams();
    params.append('username', data.username);
    params.append('password', data.password);

    const resp: Response<TokenInfo_FromAPI> = await this.post('token/create', {data: params});
    return new TokenInfo(resp.data);
  }

  public refresh = async (token?: string): Promise<TokenInfo> => {
    const config: AxiosRequestConfig = {};
    if (token) {
      config.headers = {RefreshToken: token}
    }
    const resp: Response<TokenInfo_FromAPI> = await this.post('token/refresh', config);
    return new TokenInfo(resp.data);
  };
}