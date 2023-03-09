export interface Res<T = any> {
  success: boolean
  data: T
  error: string
}

export type casesIn = 'illustration' | 'ad' | 'brand'

type source = 'image' | 'video' | 'text'

export type casesType = {
  id: string
  title: string
  subtitle: string
  cover: {
    cover_url: string
    type: source
  }
  create_time?: number
  update_time?: number
  // type: string
  remarks: string
}

export type someCaseType = {
  detail: {
    type: source
    content: string
  }[]
} & casesType

export type informationType = 'enterprise' | 'lesson'

export type informationsType = {
  current: number
  data: {
    id: string
    title: string
    abstract: string
    cover_url: string
    jump_url: string
    create_time: number
    update_time: number
    release_time: number
    type: string
  }[]
  total: number
}

export type questionnaireType = {
  name: string
  telephone: string
  service: string
  budget: string
  describe: string
}
