import axios, { AxiosInstance, AxiosResponse, ResponseType, AxiosRequestConfig, AxiosRequestHeaders, HeadersDefaults, AxiosError } from "axios";
import { getSession } from "next-auth/react"
import { NextPageContext } from "next";

export type Response<T> = {
  status: number;
  data: T;
  message?: string;
};

export class BaseService {
  private client: AxiosInstance;

  constructor(private ctx?: NextPageContext) {
    this.client = axios.create({
      baseURL: process.env.API_BASE_URL
    });
    this.client.interceptors.request.use(async (config: AxiosRequestConfig<any>) => {
      // add auth header with jwt if account is logged in and request is to the api url
      const account = await getSession(this.ctx);
      const isLoggedIn = account?.user;
      const isApiUrl = config.url!.startsWith(process.env.API_BASE_URL!);
    
      if (isLoggedIn && isApiUrl) {
        (((config.headers as unknown) as HeadersDefaults).common as AxiosRequestHeaders).Authorization = `Bearer ${account.token}`;
      }
      return config
    });
  }

  private async request(config: AxiosRequestConfig<any> = {}): Promise<Response<any>> {
    return new Promise((resolve, reject) => {
      this.client
        .request(config)
        .then((resp) => resolve(resp))
        .catch((err: AxiosError) => {
          console.error({err, resp: err.response});
          let error: Response<any> = {
            status: 0,
            data: err?.message || '',
          };

          if (err.response) {
            error.status = err.response.status;
            error.data = err.response.data;
            error.message = error?.data?.detail?.[0]?.msg ?? error?.data?.detail ?? error?.data?.message ?? error?.data;
          }

          reject(error);
        });
    });
  }

  async get(url: string, config: AxiosRequestConfig<any> = {}) {
    return this.request({ method: 'get', url, ...config });
  }

  async post(url: string, config: AxiosRequestConfig<any> = {}) {
    return this.request({ method: 'post', url, ...config });
  }

  async put(url: string, config: AxiosRequestConfig<any> = {}) {
    return this.request({ method: 'put', url, ...config });
  }

  async patch(url: string, config: AxiosRequestConfig<any> = {}) {
    return this.request({ method: 'patch', url, ...config });
  }

  async delete(url: string, config: AxiosRequestConfig<any> = {}) {
    return this.request({ method: 'delete', url, ...config });
  }
}