'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Modal from 'components/Modal/Modal'
import Footer from 'components/PageComponent/Footer'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'
import ArticleCardContent from 'components/PageComponent/ArticleCardContent'
import { Article } from 'utils/interface'
import { article } from 'utils/apis'

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

  const [articleSource, setArticleSource] = useState<Article[]>([])

  useEffect(() => {
    ;(async () => {
      await article().then((res) => setArticleSource(res.data.data))
    })()
  }, [])

  return (
    <>
      <Nav turnTransparent={navChange || modalWe} />
      <FixedTip />

      <TopContent buttonOnClick={() => setModalWe(true)} bodyStyle={{ height: '1000px' }} />

      <div className={'py-20 w-[800px] mx-auto'}>
        <div className={'w-full flex space-x-5 -mt-32'}>
          {[
            { cover: '/banner.png', text: '我的简历' },
            { cover: '/banner.png', text: '组件详解' },
            { cover: '/banner.png', text: '语法总结' },
          ].map((item, key) => (
            <div
              className={'h-[144px] bg-fillDeep grow rounded-md bg-cover cursor-pointer group relative'}
              style={{ backgroundImage: `url(${item.cover})` }}
              key={key}
            >
              <p
                className={
                  'text-textWhite absolute top-4 right-4 group-hover:text-[18px] group-hover:right-6 transition-all'
                }
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>

        <ArticleCardContent
          cardSource={articleSource}
          onClick={(text) => route.push(text)}
          bodyStyle={{ marginTop: '80px' }}
        />
      </div>

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
