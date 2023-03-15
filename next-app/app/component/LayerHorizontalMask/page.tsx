'use client'

import Nav from 'components/Nav/Nav'
import React, { useEffect, useRef, useState } from 'react'
import FixedTip from 'components/PageComponent/FixedTip'
import Footer from 'components/PageComponent/Footer'
import TopContent from 'components/PageComponent/TopContent'
import { casesType } from 'utils/interface'

const StepTime: React.FC = () => {
  const horizontalChangeDiv = useRef<HTMLDivElement>(null)
  const [marginLeft, setMarginLeft] = useState<number>(80)
  const [horRootWidth, setHorRootWidth] = useState<number>(1080)

  const handleScrollActive = () => {
    const totalDistance = 640 * caseSource.length - 740
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
    setHorRootWidth(totalDistance + 1920 - document.documentElement.offsetWidth)
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScrollActive)
    return () => window.removeEventListener('scroll', handleScrollActive)
  })

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

  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'bg-fillLight p-20'}>
        <p className={'text-[24px] my-5'}>需求：横向滚动展示素材资源，且滑到底露出底部资源，引导感兴趣的用户点击</p>
        <p>
          思路：整体监听滚动距离，滚动到内容了把整个内容 sticky 在屏幕中间，再随着滚动把展示内容向左移，露出底部资源
        </p>
        <p>1. 按资源的 length 计算出资源区的长度，保证父级 div 的 height 足够</p>
        <p>2. 把资源区的长度和父级 div 的 width 计算，随滚动距离往旁边推</p>
        <p>3. 当资源区剩余部分不足时，把整个 div 收紧，保证 title 在剩余空间居中，且保证底部资源不被遮挡</p>
        <p>4. 为了让底部 Footer 元素跟在下面，把 Footer 元素加进 sticky 元素 中，在页面最底部流出 Footer 的高度</p>
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
    </>
  )
}

export default StepTime
