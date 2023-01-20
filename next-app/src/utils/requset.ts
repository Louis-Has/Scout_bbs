import axios, { AxiosPromise, AxiosRequestConfig, AxiosResponse } from 'axios'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE

const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: false,
})

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const get: (url: string, params?: {}) => Promise<any> = (url, params = {}) => {
  const mes = localStorage.getItem('user')

  return instance(url, {
    method: 'get',
    headers: mes
      ? {
          token: JSON.parse(mes).token,
          id: JSON.parse(mes).id,
        }
      : {},
    params,
  })
}

export const post: (url: string, data: any, config: AxiosRequestConfig) => Promise<any> = (
  url,
  data = {},
  config = {}
) => {
  const mes = localStorage.getItem('user')

  return instance(url, {
    method: 'post',
    data,
    ...config,
    headers: mes
      ? {
          token: JSON.parse(mes).token,
          id: JSON.parse(mes).id,
        }
      : {},
  })
}
