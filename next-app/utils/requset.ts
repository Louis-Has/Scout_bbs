import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

const instance = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  withCredentials: false,
})

instance.interceptors.response.use(
  (res: AxiosResponse) => {
    if (res.status === 251) {
      console.warn('验证已过期，请重新登录')
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const get = (url: string, params = {}) => {
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

export const post = (url: string, data = {}, config: AxiosRequestConfig = {}) => {
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
