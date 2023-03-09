'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import Modal from 'components/Modal/Modal'
import InfiniteWrapper from 'components/InfiniteWrapper/InfiniteWrapper'
import { casesType, someCaseType } from 'utils/interface'
import FixedTip from 'components/FixedTip/FixedTip'

const HomePage: React.FC = () => {
  const route = useRouter()

  const [navBlack, setNavBlack] = useState<boolean>(false)
  const parentDiv = useRef<HTMLDivElement>(null) // wrapperApple

  const handleScrollActive = () => {
    setNavBlack(document.documentElement.scrollTop + 80 > Number(parentDiv.current?.offsetTop)) // changeNav
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollActive)
    return () => window.removeEventListener('scroll', handleScrollActive)
  })

  const [modalWe, setModalWe] = useState<boolean>(false)

  return (
    <>
      <Nav turnBlack={navBlack || modalWe} />
      <FixedTip />

      <div className={'w-full min-h-[1000px] relative overflow-hidden'}>
        <img src={'banner.png'} alt={'banner'} className={'w-full h-full'} />

        <div className={'absoluteCenter flexCenter flex-col text-textWhite text-[24px] font-medium'}>
          <p className={'text-[72px] font-semibold'}>
            <span>Welcome to</span> <span>Yinghao's Park</span>
          </p>
          <p className={'uppercase mt-[18px]'}>While there is life there is hope</p>

          <button
            className={
              'mt-[50px] px-[32px] py-[10px] border border-white flex items-center hover:bg-mainGreen hover:text-white hover:border-transparent'
            }
            onClick={() => setModalWe(true)}
          >
            <span>联系我</span>
            <svg className={'icon ml-3'} aria-hidden='true'>
              <use xlinkHref='#icon-yuwomenhezuo' />
            </svg>
          </button>
        </div>
      </div>

      <div className={'h-[200px]'}></div>

      <Footer />

      <Modal
        open={modalWe}
        onCancel={() => setModalWe(false)}
        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={'px-10 py-6 bg-white rounded-[18px] '}>
          <Image src={'/wechat.jpg'} alt={'yimu'} width={200} height={200} />
          <p className={'text-textDeep text-center'}>扫一扫联系我</p>
        </div>
      </Modal>
    </>
  )
}

export default HomePage
