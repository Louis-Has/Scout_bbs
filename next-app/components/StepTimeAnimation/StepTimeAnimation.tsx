'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const StepTimeAnimation: React.FC = () => {
  useEffect(() => {
    handleResize()
  }, [])

  const eventSource = [
    {
      year: '情感与动机',
      content: {
        title: '「受力分析」',
        date: '2018.02',
        desc: '如果我们把「学习动机的存在与否」归因到努力和认真上的话，这个事情一般就会变得无解。我会更加倾向于归到另外一个归因上：勇气。',
        coverImg: '/component/238bb7784581276b21a3846775edc024.png',
      },
    },
    {
      year: '社会支持',
      content: {
        title: '有效的社会支持系统',
        date: '2018.03',
        desc: '社会支持系统是一个最重要的基础，对应的表象才是学习的动机。很多时候我看到的是动机，但藏在下面这个社会支持系统是很难见到的，所以常常会被忽视，这就非常可惜。',
        coverImg: '/component/4929fe0cf28e69fe433411d441c907af.png',
      },
    },
    {
      year: '能力与方法',
      content: {
        title: '和成绩有关的两个维度',
        date: '2018.04',
        desc: '能力维度指的是，学生真的有没有具体的能力的去解决这个科目所对应的问题。',
        coverImg: '/component/4cafa03ff31d4cb44d4c89146b54096e.png',
      },
    },
    {
      year: '生物',
      content: {
        title: '随便打开必修一，挑一页',
        date: '2018.05',
        desc: '今天我在这边提出一种可行的可能的方法，实际上我就是通过这样的一个办法，我把我的生物给 K 到了一个顶标水平？',
        coverImg: '/component/049bd8643b7dcc1d86b0a423c39bc96c.png',
      },
    },
    {
      year: '练习翻译',
      content: {
        title: '错误的翻译方法',
        date: '2018.06',
        desc: '做阅读题，特别是对于高中和考研英语来讲，重点并不是 ABCD 能不能选对，而是语料究竟有没有透彻的看懂。',
        coverImg: '/component/201ebdb65d5a2fa669961b28a33ea09f.png',
      },
    },
    {
      year: '写作练习',
      content: {
        title: '假设你是李华',
        date: '2018.07',
        desc: '通过这种题目很难系统性的训练到「各种时态」的使用，也很难覆盖到所有「常见词汇」和「语法结构」。',
        coverImg: '/component/21bc9c9b9486c94add9e8a17195c7d65.png',
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
      <p className={'text-[20px]'}>StepTimeAnimation</p>
      <a target={'_blank'} href={'https://sspai.com/post/78288'} className={'text-[32px] font-bold mt-5'}>
        原文章：抛开分数，看看那些和学习有关的方法、价值和意义
      </a>

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
                <p className={'absolute top-8 w-max left-0 -translate-x-1/2 text-[24px] font-medium'}>{item.year}</p>
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
