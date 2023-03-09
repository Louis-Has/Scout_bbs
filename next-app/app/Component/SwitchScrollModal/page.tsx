'use client'

import Nav from 'components/Nav/Nav'
import React from 'react'
import FixedTip from 'components/PageComponent/FixedTip'
import Footer from 'components/PageComponent/Footer'
import TopContent from 'components/PageComponent/TopContent'

const SwitchScrollModal: React.FC = () => {
  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'h-[200px] bg-fillLight'}>
        <p>需求：实现 Modal ,且能和主题页面切换滚动</p>
        <p>思路：用 position 控制前后部分，记录滚动距离，以方便回到页面的位置</p>
        <p>1. 用 createPortal 在 body 标签内生成 Modal 元素</p>
        <p>2. 用 visible 做隐藏，方便做出现动画，把整个页面的 paddingRight 推15px ，防止 Modal 显示后页面变形</p>
        <p>3. 监控记录当前滚动距离，再关闭 Modal 时恢复页面 position ，并把滚动距离复原</p>
        <p>4. 点击 mask 关闭动作，避免冒泡到内容部分，需要判断是当前元素</p>
      </div>

      <Footer />
    </>
  )
}

export default SwitchScrollModal
