import React from 'react'
import { useRouter } from 'next/navigation'

const Footer: React.FC = () => {
  const route = useRouter()

  const footerSource = [{ icon: 'icon-github', pathname: 'https://github.com/Scout-szz' }]

  return (
    <>
      <div
        className={
          'w-full bg-fillDeep h-[300px] px-20 pt-20 text-fillDeep text-[14px] overflow-hidden flexCenter flex-col'
        }
      >
        <div className={'flex items-center space-x-5'}>
          <div className={'w-10 h-10 bg-white rounded-full flexCenter'}>
            <svg className={'icon w-6 h-6'} aria-hidden='true'>
              <use xlinkHref='#icon-a-icon_wechat2' />
            </svg>
          </div>
          {footerSource.map((item, key) => (
            <a href={item.pathname}>
              <div className={'w-10 h-10 bg-white rounded-full flexCenter'}>
                <svg className={'icon w-6 h-6'} aria-hidden='true'>
                  <use xlinkHref={'#' + item.icon} />
                </svg>
              </div>
            </a>
          ))}
        </div>
        <p className={'mt-10 text-textWhite'}>Copyright © YH 2023</p>
      </div>
    </>
  )
}

export default Footer
