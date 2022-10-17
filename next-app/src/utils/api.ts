import { get } from './requset'

// areaType: 每日推荐 0, 海报模板 1, 3D模板 2, 热门素材 3
export const getPublicStaticsList = (areaType: string = '0') => {
  return get('/statics/public/getPublicStaticsList' + '?areaType=' + areaType)
}

export type modalDataItemType = 'public' | 'material'

export interface modalData {
  id: string
  tmpSmallUrl: string
  tmpUrl: string
  tag: {
    category: string
    context: string
    tagId: string
  }[]
  collection: boolean
  picType: string
  pixel: string
  title: string
  author: string
  introduce: string
  template: string
  staticType: modalDataItemType
}
