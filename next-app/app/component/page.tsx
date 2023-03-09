'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Footer from 'components/PageComponent/Footer'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'

const HomePage: React.FC = () => {
  const route = useRouter()

  const tabSource = [
    { cover: '/banner.png', title: 'InfiniteCarousel', subTitle: '无限横向不定宽滚动', pathname: 'InfiniteCarousel' },
    {
      cover: '/banner.png',
      title: 'LayerHorizontalMask',
      subTitle: '随滚动变化的组合动画',
      pathname: 'LayerHorizontalMask',
    },
    {
      cover: '/banner.png',
      title: 'StepTimeAnimation',
      subTitle: '分阶段自动可控时间轴展示',
      pathname: 'StepTimeAnimation',
    },
    {
      cover: '/banner.png',
      title: 'SwitchScrollModal',
      subTitle: '可上下滚动式 Modal',
      pathname: 'SwitchScrollModal',
    },
  ]

  const tagSource = [
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
    { text: 'Next.js' },
    { text: 'Ant Design' },
    { text: 'Element UI' },
    { text: 'Webpack' },
    { text: 'Vite' },
    { text: 'Tailwind' },
    { text: '虚拟DOM' },
    { text: 'TypeScript' },
    { text: 'Lodash' },
    { text: 'Docker' },
    { text: 'Nest.js' },
    { text: 'Nginx' },
    { text: 'koa.js' },
    { text: 'mysql' },
    { text: 'MongeDB' },
  ]
  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'flex justify-center py-20'}>
        <div className={'w-[800px] flex flex-col space-y-5'}>
          {tabSource.map((item, key) => (
            <div
              className={'w-full bg-fillLight h-[200px] flex cursor-pointer'}
              key={key}
              onClick={() => route.push('/component/' + item.pathname)}
            >
              <div className={'w-[400px] h-full overflow-hidden group'}>
                <img
                  src={item.cover}
                  alt={'cover'}
                  className={'w-[400px] h-full object-cover transition-all group-hover:scale-110'}
                />
              </div>

              <div className={'p-10 text-textDeep flex flex-col justify-between'}>
                <p className={'text-[28px] font-bold'}>{item.title}</p>
                <p className={''}>{item.subTitle}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={'w-[320px] bg-fillLight ml-10 p-5'}>
          <p className={'font-bold'}>FEATURED TAGS</p>
          <div className={'flex flex-wrap'}>
            {tagSource.map((item) => (
              <span className={'border rounded-full px-4 py-2 mx-1 my-2 text-[12px]'}>{item.text}</span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
