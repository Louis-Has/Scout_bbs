import React from 'react'
import Image from 'next/image'

const FixedTip: React.FC = () => {
  return (
    <div className={'fixed bottom-[100px] right-[32px] z-10'}>
      <div
        className={
          'w-12 h-12 border border-fillLight bg-white rounded-full flexCenter text-textDeep02 hover:bg-mainGreen hover:border-0 hover:text-white group'
        }
        style={{ boxShadow: '0px 4px 10px rgba(51, 51, 51, 0.1)' }}
      >
        <svg className={'icon w-5 h-5'} aria-hidden='true'>
          <use xlinkHref='#icon-erweima' />
        </svg>

        <div
          className={
            'absolute top-0 right-[60px] w-[120px] h-[120px] bg-white border border-fillLight rounded-[8px] flexCenter flex-col hidden group-hover:block py-2'
          }
          style={{ boxShadow: '0px 4px 10px rgba(51, 51, 51, 0.1)' }}
        >
          <Image src={'/wechat.jpg'} alt={'yimu'} width={86} height={86} className={'mx-auto'} />
          <p className={'text-textDeep text-center text-[12px]'}>扫一扫联系我</p>
        </div>
      </div>

      <div
        className={
          'w-12 h-12 border border-fillLight bg-white rounded-full flexCenter text-textDeep02 mt-5 hover:bg-mainGreen hover:border-transparent hover:text-white'
        }
        style={{ boxShadow: '0px 4px 10px rgba(51, 51, 51, 0.1)' }}
        onClick={() => {
          if (!document.scrollingElement) return
          window.scrollTo({
            top: 0,
          })
        }}
      >
        <svg className={'icon w-5 h-5'} aria-hidden='true'>
          <use xlinkHref='#icon-fanhuidingbu' />
        </svg>
      </div>
    </div>
  )
}

export default FixedTip
