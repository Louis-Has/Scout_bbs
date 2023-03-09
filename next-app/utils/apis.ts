import { get, post } from './requset'
import { AxiosResponse } from 'axios'
import {
  casesIn,
  casesType,
  informationsType,
  informationType,
  questionnaireType,
  someCaseType,
  Res,
} from 'utils/interface'

export  type ApiType<G, T> = (params: G) => Promise<AxiosResponse<Res<T>>>

export const cases: ApiType<{ type?: casesIn; ids?: string[] }, casesType[]> = (params) =>
  get('/cases', params)

export const someCase: ApiType<string, someCaseType> = (params) => get('/cases/' + params)

export const informations: ApiType<
  {
    type: informationType
    current: number
    pagesize: number
  },
  informationsType
> = (params) => get('informations', params)

export const questionnaire: ApiType<questionnaireType, {}> = (params) =>
  post('questionnaire', params)

export const remote: ApiType<string, { tmp_url: string }> = (params) => get('remote/' + params)
