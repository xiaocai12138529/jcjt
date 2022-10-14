import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import type { IRequestConfig, IRequestInterceptors } from './types'

import { message } from 'ant-design-vue'
import router from '@/router'
import storage from '@/utils/storage'
import cookie from '@/utils/cookie'

export default class Service {
  private instance: AxiosInstance
  private config: AxiosRequestConfig
  private interceptors?: IRequestInterceptors

  constructor(config: IRequestConfig) {
    this.config = config
    this.instance = axios.create(config)
    this.interceptors = config.interceptors

    // 构造拦截器
    // this.instance.interceptors.request.use(this.interceptors?.request, this.interceptors?.requestCatch);
    // this.instance.interceptors.response.use(this.interceptors?.response, this.interceptors?.responseCatch);

    // 公共拦截器
    this.instance.interceptors.request.use((config: any) => {
      let token = storage.getStorage('_token')
      if (config.url == '/api/rimapi/LC/GetMyCurrentTask') {
        token = cookie.getCookie('token_oa')
      }
      if (token) {
        config.headers.token = token
      }
      return config
    })

    this.instance.interceptors.response.use(
      (res) => {
        const data = res.data
        if (data.code === 200 || data.Status === 200 || data.code === 1) {
          return data.data || data.Data
        } else if (data.msg) {
          if (data.msg !== '登录信息失败！') message.error(data.msg)
          return Promise.reject(data.msg)
        } else {
          message.error('请求失败，请重试')
          return Promise.reject()
        }
      },
      (err) => {
        if (err.response.status === 401) {
          message.error('登录过期，请重新登录')
          router.push('/login')
          return Promise.reject(err)
        }
        if (err.response.status >= 400) {
          message.error('请求失败，请稍后重试')
        }
        return Promise.reject(err)
      }
    )
  }

  // 实例方法
  private request<T = any>(config: IRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<any, T>(config)
        .then((res) => {
          resolve(res)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  get<T = any>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  delete<T = any>(config: IRequestConfig<T>) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }

  upload<T = any>(config: IRequestConfig<T>) {
    return this.request<T>({
      ...config,
      method: 'POST',
      headers: { 'Content-type': 'multipart/form-data' },
    })
  }
}
