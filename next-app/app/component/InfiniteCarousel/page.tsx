'use client'

import Nav from 'components/Nav/Nav'
import React, { useRef } from 'react'
import FixedTip from 'components/PageComponent/FixedTip'
import Footer from 'components/PageComponent/Footer'
import TopContent from 'components/PageComponent/TopContent'
import InfiniteWrapper from 'components/InfiniteWrapper/InfiniteWrapper'

const StepTimeAnimation: React.FC = () => {
  const parentDiv = useRef<HTMLDivElement>(null) // wrapperApple
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
        { text: 'Lodash' },
      ],
    },
    {
      direction: true,
      content: [
        { text: 'Docker' },
        { text: 'Nest.js' },
        { text: 'Nginx' },
        { text: 'koa.js' },
        { text: 'mysql' },
        { text: 'MongeDB' },
      ],
    },
  ]

  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'h-[200px] bg-fillLight'}>
        <p>需求：实现多条无限滚动栏</p>
        <p>思路：用 setInterval 实现一栏的不断位移，当内容不够时，再复制一组进去</p>
        <p>1. 用 absolute 分别定位元素，方便各自悬浮暂停移动</p>
        <p>2. 通过 位移距离，内容栏，父级 width 的计算，当内容即将不足时，往内容资源再加一组进去</p>
        <p>3. 为了防止多组元素的渲染压力，判断当前内容是否已经超出可见区域，超出即 display none ，节约性能</p>
      </div>

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

      <Footer />
    </>
  )
}

export default StepTimeAnimation
