'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const StepTimeAnimation: React.FC = () => {
  useEffect(() => {
    handleResize()
  }, [])

  const eventSource = [
    {
      year: 2016,
      content: {
        title: '一目可视品牌成立',
        date: '2016.10',
        desc: '创立国内首个医学可视化品牌「一目可视」，专为客户提供各类顶级医学可视化定制服务。',
        coverImg: '/about/2016pic.png',
        backImg: '/about/2016.png',
      },
    },
    {
      year: 2017,
      content: {
        title: '一目可视 | 走红网络',
        date: '2017.10',
        desc: '创始人周舒扬因心脏插画在网络上迅速走红，引发多家主流媒体争相报道，将医学插画带入大众视野。',
        coverImg: '/about/2017pic.png',
        backImg: '/about/2017.png',
      },
    },
    {
      year: 2018,
      content: {
        title: '一目可视 | 创办一目学院',
        date: '2018.05',
        desc: '创办全国首家医学可视化在线教育平台「一目学院」，专为医学可视化技术爱好者提供专业的技能培训服务，已累计培训学员4000余名。',
        coverImg: '/about/2018pic.png',
        backImg: '/about/2018.png',
      },
    },
    {
      year: 2019,
      content: {
        title: '一目可视 | 荣誉奖项',
        date: '2019.07',
        desc: '获北美医学插画协会会展（2019 AMI Salon）广告类Award of Excellence（最高奖项）',
        coverImg: '/about/2019pic.png',
        backImg: '/about/2019.png',
      },
    },
    {
      year: 2020,
      content: {
        title: '一目可视 | 百度合作',
        date: '2020.08',
        desc: '成为百度健康医典供应商，提供大量优质专业医学科普插画，共同推动医学健康科普事业的发展。',
        coverImg: '/about/2020pic.png',
        backImg: '/about/2020.png',
      },
    },
    {
      year: 2021,
      content: {
        title: '一目可视 | 强生合作',
        date: '2021.09',
        desc: '成为强生的优质供应商，为各类医疗产品提供高质量定制服务，服务涵盖3D动画、平面设计、产品包装。',
        coverImg: '/about/2021pic.png',
        backImg: '/about/2021.png',
      },
    },
    {
      year: 2022,
      content: {
        title: '一目可视 | ELSEVIER',
        date: '2022.06',
        desc: '与爱思唯尔联合举办首届"爱MU杯"医学可视化大赛。',
        coverImg: '/about/2022pic.png',
        backImg: '/about/2022.png',
      },
    },
  ]

  const [eventTotal, setEventTotal] = useState<number>(0)

  const handleResize = () => {
    setEventTotal(Math.floor((document.documentElement.clientWidth - 336) / 275))
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  })

  const handleSwitchEvent = (next: boolean = true) => {
    const nowEvent = next ? Math.min(eventSource.length - 1, currentEvent + 1) : Math.max(0, currentEvent - 1)

    setCurrentEvent(nowEvent)
    setCurrentDelayEvent(nowEvent)
    setEventProcess('down')
  }

  const [currentEvent, setCurrentEvent] = useState<number>(0)
  const [currentDelayEvent, setCurrentDelayEvent] = useState<number>(0)
  const [eventProcess, setEventProcess] = useState<'normal' | 'raise' | 'down' | 'up'>('normal')

  const raiseTime = 3000
  const changeTime = 500

  useEffect(() => {
    if (eventProcess !== 'raise') return
    const clearTime = setTimeout(() => {
      setCurrentEvent(currentEvent + 1 === eventSource.length ? 0 : currentEvent + 1)
      setEventProcess('down')
    }, raiseTime)
    return () => clearTimeout(clearTime)
  }, [eventProcess])

  useEffect(() => {
    if (eventProcess !== 'down') return
    const clearTime = setTimeout(() => {
      setCurrentDelayEvent(currentEvent)
      setEventProcess('up')
    }, changeTime)
    return () => clearTimeout(clearTime)
  }, [eventProcess])

  useEffect(() => {
    if (eventProcess !== 'up') return
    const clearTime = setTimeout(() => {
      setEventProcess('normal')
    }, changeTime)
    return () => clearTimeout(clearTime)
  }, [eventProcess])

  useEffect(() => {
    if (eventProcess !== 'normal') return
    setEventProcess('raise')
  }, [eventProcess])

  return (
    <div className={'h-[1000px] text-textDeep pt-[100px] flex flex-col items-center'}>
      <p className={'text-[20px]'}>我们的成长</p>
      <p className={'text-[32px] font-bold mt-5'}>一目可视大事记</p>

      <div className={'flex items-center mt-[120px]'}>
        <div
          className={'relative h-[320px] transition-all ease-out opacity-100'}
          style={{
            ...{ transitionDuration: changeTime + 'ms' },
            ...(eventProcess === 'down' ? { opacity: 0, transform: 'scale(1.05)' } : {}),
          }}
        >
          <Image
            src={eventSource[currentDelayEvent].content.coverImg}
            alt={'cover'}
            width={572}
            height={340}
            className={'absoluteCenter blur-[80px] -z-10 opacity-30'}
          />
          <Image src={eventSource[currentDelayEvent].content.coverImg} alt={'cover'} width={540} height={320} />
        </div>

        <div
          className={'ml-[100px] w-[640px]'}
          style={{
            ...{ transitionDuration: changeTime + 'ms' },
            ...(eventProcess === 'down' ? { opacity: 0, paddingTop: '20px' } : {}),
          }}
        >
          <p className={'text-mainGreen text-[32px] font-black'}>{eventSource[currentDelayEvent].content.title}</p>
          <p className={'text-textDeep02 font-medium mt-2'}>{eventSource[currentDelayEvent].content.date}</p>
          <p className={'text-textDeep mt-6'}>{eventSource[currentDelayEvent].content.desc}</p>
        </div>
      </div>

      <div className={'flex items-center px-[120px] mt-[120px] w-full h-[120px] relative'}>
        <div className={'h-[2px] bg-linLightGray absoluteCenter w-full -z-10'} />
        <div
          className={
            'min-w-[48px] h-[48px] rounded-full bg-fillLight border border-linLightGray flexCenter cursor-pointer'
          }
          onClick={() => handleSwitchEvent(false)}
        >
          <svg className={'icon w-5 h-5 text-textDeep01 rotate-180'} aria-hidden='true'>
            <use xlinkHref='#icon-xiayiye' />
          </svg>
        </div>

        <div className={'grow flex items-center h-full relative overflow-hidden'}>
          <div
            className={'absolute flex space-x-[263px] relative transition-all ease-linear'}
            style={{ left: -Math.max(0, currentEvent - eventTotal + 2) * 275 + 'px' }}
          >
            <div
              className={'absolute top-[5px] transition-all w-0 h-[2px] bg-mainGreen ease-linear'}
              style={{
                ...{
                  left: (currentEvent + 1) * 275 + 'px',
                },
                ...(() => {
                  switch (eventProcess) {
                    case 'raise':
                      return { width: '263px', transitionDuration: raiseTime + 'ms' }
                    case 'down':
                      return { width: '0px', transitionDuration: changeTime * 2 + 'ms' }
                    case 'up':
                      return { width: '0px', transitionDuration: changeTime * 2 + 'ms' }
                  }
                })(),
              }}
            />
            {eventSource.map((item, key) => (
              <div
                className={'h-3 w-3 rounded-full relative'}
                key={key}
                style={
                  currentEvent === key
                    ? { background: '#0FB77A', color: '#0FB77A' }
                    : { background: '#D1D5DC', color: '#5B626D' }
                }
              >
                <p className={'absolute top-4 left-[-24px] text-[24px] font-medium'}>{item.year}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className={
            'min-w-[48px] h-[48px] rounded-full bg-fillLight border border-linLightGray flexCenter cursor-pointer'
          }
          onClick={() => handleSwitchEvent()}
        >
          <svg className={'icon w-5 h-5 text-textDeep01'} aria-hidden='true'>
            <use xlinkHref='#icon-xiayiye' />
          </svg>
        </div>
      </div>
    </div>
  )
}

export default StepTimeAnimation
