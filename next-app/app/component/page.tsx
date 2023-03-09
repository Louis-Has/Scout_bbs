'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import Modal from 'components/Modal/Modal'
import InfiniteWrapper from 'components/InfiniteWrapper/InfiniteWrapper'
import FixedTip from 'components/FixedTip/FixedTip'
import { casesType, someCaseType } from 'utils/interface'
import StepTimeAnimation from 'components/StepTimeAnimation/StepTimeAnimation'

const HomePage: React.FC = () => {
  const route = useRouter()

  const [navBlack, setNavBlack] = useState<boolean>(false)

  const parentDiv = useRef<HTMLDivElement>(null) // wrapperApple

  const horizontalChangeDiv = useRef<HTMLDivElement>(null)
  const [marginLeft, setMarginLeft] = useState<number>(80)
  const [horRootWidth, setHorRootWidth] = useState<number>(1080)

  const handleScrollActive = () => {
    setNavBlack(document.documentElement.scrollTop + 80 > Number(parentDiv.current?.offsetTop)) // changeNav

    const totalDistance = 640 * caseSource.length + 1180 - document.documentElement.offsetWidth
    setMarginLeft(
      80 -
        Math.max(
          0,
          Math.min(
            totalDistance + 130,
            document.documentElement.scrollTop + 80 - Number(horizontalChangeDiv.current?.offsetTop)
          )
        )
    )
    setHorRootWidth(totalDistance)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollActive)
    return () => window.removeEventListener('scroll', handleScrollActive)
  })

  const cooperationSource = [
    {
      direction: true,
      content: [
        { text: 'JavaScript' },
        { text: 'HTML5' },
        { text: 'CSS3' },
        { text: '闭包' },
        { text: '原型' },
        { text: 'canvas' },
        { text: 'promise' },
        { text: 'Ajax' },
        { text: 'HTTP' },
        { text: 'XSS' },
        { text: 'Debouncing' },
        { text: 'pnpm' },
        { text: 'SSH' },
        { text: 'git' },
      ],
    },
    {
      direction: false,
      content: [
        { text: 'Next.js' },
        { text: 'Ant Design' },
        { text: 'Element UI' },
        { text: 'Webpack' },
        { text: 'Vite' },
        { text: 'Tailwind' },
        { text: '虚拟DOM' },
        { text: 'TypeScript' },
      ],
    },
    {
      direction: true,
      content: [{ text: 'Docker' }, { text: 'Nest.js' }, { text: 'Nginx' }, { text: 'koa.js' }],
    },
  ]

  const [caseSource, setCaseSource] = useState<casesType[]>([
    {
      id: '',
      title: 'Class Properties',
      subtitle: '',
      cover: { cover_url: '/home/case/Properties.png', type: 'image' },
      remarks: '1',
    },
    {
      id: '',
      title: 'string.padEnd() and string.padStart()',
      subtitle: '',
      cover: { cover_url: '/home/case/padStart.png', type: 'image' },
      remarks: '2',
    },
    {
      id: '',
      title: 'Trailing comma',
      subtitle: '',
      cover: { cover_url: '/home/case/Trailing comma.png', type: 'image' },
      remarks: '2',
    },
    {
      id: '',
      title: 'Object.values() and Object.entries()',
      subtitle: '',
      cover: { cover_url: '/home/case/Object.values() and Object.entries().png', type: 'image' },
      remarks: '2',
    },
    {
      id: '',
      title: 'array.prototype.includes()',
      subtitle: '',
      cover: { cover_url: '/home/case/array.prototype.includes.png', type: 'image' },
      remarks: '2',
    },
    {
      id: '',
      title: 'object.getOwnPropertyDescriptors()',
      subtitle: '',
      cover: { cover_url: '/home/case/array.prototype.includes.png', type: 'image' },
      remarks: '2',
    },
  ])

  const [modalWe, setModalWe] = useState<boolean>(false)

  return (
    <>
      <Nav turnBlack={navBlack || modalWe} />
      <FixedTip />

      <div className={'w-full h-[600px] relative overflow-hidden'}>
        <img src={'banner.png'} alt={'banner'} className={'w-full h-full object-cover'} />

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

      <div className={'h-[200px] bg-fillLight'}></div>
      <StepTimeAnimation />

      <div className={'h-[640px] bg-fillLight overflow-hidden relative'} ref={parentDiv}>
        {cooperationSource.map((item, key) => (
          <InfiniteWrapper
            content={item.content}
            top={120 + key * 140}
            parentWidth={parentDiv.current?.clientWidth}
            directionRight={item.direction}
          />
        ))}
      </div>

      <div className={'relative'} style={{ height: horRootWidth + 1010 + 'px' }} ref={horizontalChangeDiv}>
        <div className={'sticky top-20 h-[1010px]'}>
          <div className={'flex h-full'}>
            <div className={'grow'} />
            <div className={'w-[1010px] relative h-full'}>
              <img src='/banner.png' alt='banner' className={'absoluteCenter h-full object-cover'} />

              <div className={'absoluteCenter flexCenter flex-col text-textWhite text-[24px] font-medium'}>
                <p className={'text-[72px] font-semibold'}>
                  <span>Yinghao's Park</span>
                </p>
                <p className={'uppercase mt-[18px]'}>While there is life there is hope</p>

                <button
                  className={
                    'mt-[50px] px-[32px] py-[10px] border border-white flex items-center hover:bg-mainGreen hover:text-white hover:border-0'
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

            <div
              className={'absolute h-full top-0 text-textDeep pt-[120px] text-center bg-white'}
              style={{
                width:
                  Math.min(Number(horizontalChangeDiv.current?.offsetWidth), horRootWidth + marginLeft + 860) + 'px',
              }}
            >
              <p className={'text-[18px]'}>Es7, Es8, Es9, and Es10 Features</p>
              <p className={'text-[32px] font-medium mt-6'}>滚动鼠标，可引导内容部分向左，露出右边部分</p>

              <div className={'w-full h-[516px] mt-20 overflow-hidden relative'}>
                <div className={'w-max flex space-x-5 h-[516px] absolute'} style={{ left: marginLeft + 'px' }}>
                  {caseSource.map((item, key) => (
                    <div className={'border-b border-fillDeep text-left pb-5 group'} key={key}>
                      <div
                        className={'w-[600px] h-[400px] overflow-hidden relative border-fillDeep group-hover:border-t'}
                      >
                        <img
                          src={item.cover.cover_url}
                          alt={'cover'}
                          className={'group-hover:scale-110 transition-all h-full object-cover'}
                        />

                        <p
                          className={
                            'hidden group-hover:block absolute top-6 left-6 text-textWhite text-[24px] font-bold'
                          }
                        >
                          {item.remarks}
                        </p>
                        {item.cover.type !== 'video' || (
                          <div className={'absoluteCenter flexCenter w-full h-full bg-[#00000033]'}>
                            <svg className={'icon w-[60px] h-[60px] text-[#FFFFFFCC]'} aria-hidden='true'>
                              <use xlinkHref='#icon-play' />
                            </svg>
                          </div>
                        )}
                      </div>
                      <p className={'text-textDeep text-[24px] font-bold mt-8 group-hover:text-mainGreen'}>
                        {item.title}
                      </p>
                      <p className={'text-textDeep02 mt-2'}>{item.subtitle}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={'absolute left-0 w-full'} style={{ top: 1010 + 'px' }}>
              <Footer />
            </div>
          </div>
        </div>
      </div>

      <div className={'h-[300px]'} />

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
