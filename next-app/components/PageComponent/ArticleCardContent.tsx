import React from 'react'
import { ArticleType } from 'utils/interface'

interface Props {
  cardSource: ArticleType[]
  onClick?: (text: string) => void
  bodyStyle?: React.CSSProperties
}

const ArticleCardContent: React.FC<Props> = (props) => {
  return (
    <div className={'w-[800px] flex flex-col space-y-5'} style={props.bodyStyle}>
      {props.cardSource.map((item, key) => (
        <div
          className={'w-full bg-fillLight h-[200px] flex cursor-pointer group'}
          key={key}
          onClick={() => props.onClick(item.pathname)}
        >
          <div className={'w-[400px] h-full overflow-hidden'}>
            <img
              src={item.cover || '/banner.png'}
              alt={'cover'}
              className={'w-[400px] h-full object-cover transition-all group-hover:scale-110'}
            />
          </div>

          <div className={'p-10 text-textDeep flex flex-col justify-between'}>
            <p className={'text-[28px] font-bold'}>{item.title}</p>
            <p className={''}>{item.sub_title || '(新建文件夹'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleCardContent
