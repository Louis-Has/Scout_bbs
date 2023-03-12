'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Nav from 'components/Nav/Nav'
import Footer from 'components/PageComponent/Footer'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'
import ArticleCardContent from 'components/PageComponent/ArticleCardContent'
import { articleCardType } from 'utils/interface'

const HomePage: React.FC = () => {
  const route = useRouter()

  const tabSource: articleCardType[] = [
    {
      cover: '/component/InfiniteCarousel.png',
      title: 'InfiniteCarousel',
      subTitle: '无限横向不定宽滚动',
      pathname: 'InfiniteCarousel',
    },
    {
      cover: '/component/LayerHorizontalMask.png',
      title: 'LayerHorizontalMask',
      subTitle: '随滚动变化的组合动画',
      pathname: 'LayerHorizontalMask',
    },
    {
      cover: '/component/StepTimeAnimation.png',
      title: 'StepTimeAnimation',
      subTitle: '分阶段自动可控时间轴展示',
      pathname: 'StepTimeAnimation',
    },
    {
      cover: '/component/ControlledVirtualizedWaterfall.png',
      title: 'ControlledVirtualizedWaterfall',
      subTitle: '自适应、虚拟化瀑布流',
      pathname: 'Waterfall',
    },
    {
      cover: '/component/LikeAntd.png',
      title: 'like Antd Component',
      subTitle: '类似 Antd 组件',
      pathname: 'LikeAntd',
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
        <ArticleCardContent cardSource={tabSource} onClick={(text: string) => route.push('/component/' + text)} />

        <div className={'w-[320px] bg-fillLight ml-10 p-5'}>
          <p className={'font-bold'}>FEATURED TAGS</p>
          <div className={'flex flex-wrap'}>
            {tagSource.map((item, key) => (
              <span className={'border rounded-full px-4 py-2 mx-1 my-2 text-[12px]'} key={key}>
                {item.text}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default HomePage
