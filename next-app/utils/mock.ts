import { casesType, Res } from './interface'

// export type ApiType<G, T> = (params: G) => Promise<{ data: Res<T> }>

export const mockPromise = (data) =>
  new Promise((resolve) => {
    resolve({
      data: {
        success: true,
        data: data,
        error: '',
      },
    })
  })

export const queryDisplayCases = (params) => mockPromise([{ id: '', title: '' }])
