import jwtDecode from "jwt-decode";

export interface TokenInfo_API {
  access_token: string
  refresh_token: string
  token_type: string
}

export interface TokenClaims {
  sub: string
  exp: number
}

export class TokenInfo {
  accessToken: string
  refreshToken: string
  tokenType: string
  expTime: number
  claims: TokenClaims

  constructor(data: TokenInfo_API) {
    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
    this.tokenType = data.token_type;
    
    const decoded: TokenClaims = jwtDecode(data.access_token);
    decoded.exp *= 1000;
    this.expTime = decoded.exp
    this.claims = decoded
  }
}