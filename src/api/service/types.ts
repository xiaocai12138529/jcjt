import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface IRequestInterceptors<T = AxiosResponse> {
  request?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestCatch?: (err: any) => any;
  response?: (res: T) => T;
  responseCatch?: (err: any) => any;
}

export interface IRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: IRequestInterceptors<T>;
}
