'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Modal from 'components/Modal/Modal'
import Footer from 'components/PageComponent/Footer'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'

const HomePage: React.FC = () => {
  const route = useRouter()

  const [navChange, setNavChange] = useState<boolean>(true)
  const parentDiv = useRef<HTMLDivElement>(null) // wrapperApple

  const handleScrollActive = () => {
    setNavChange(document.documentElement.scrollTop + 80 < Number(parentDiv.current?.offsetTop)) // changeNav
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollActive)
    return () => window.removeEventListener('scroll', handleScrollActive)
  })

  const [modalWe, setModalWe] = useState<boolean>(false)

  return (
    <>
      <Nav turnTransparent={navChange || modalWe} />
      <FixedTip />

      <TopContent buttonOnClick={() => setModalWe(true)} bodyStyle={{ height: '1000px' }} />

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
