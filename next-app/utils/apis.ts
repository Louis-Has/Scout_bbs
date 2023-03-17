import { get } from './requset'
import { AxiosResponse } from 'axios'
import { Article, casesIn, casesType, Res } from 'utils/interface'

export type ApiType<G, T> = (params: G) => Promise<AxiosResponse<Res<T>>>

export const cases: ApiType<{ type?: casesIn; ids?: string[] }, casesType[]> = (params) => get('/cases', params)

export const remote: ApiType<string, { tmp_url: string }> = (params) => get('remote/' + params)

export const article: ApiType<void, Article[]> = () => get('/article')
