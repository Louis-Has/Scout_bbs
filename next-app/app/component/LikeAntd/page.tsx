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

      <div className={'bg-fillLight p-20'}>
        <p className={'text-[24px] my-5'}>需求：实现常用组件，大部分可从 Antd 参考</p>
        <p>1. Input 组件，用 isComposing 防止误操作</p>
        <p>2. Modal 组件：用 createPortal 在 body 标签内生成 Modal 元素</p>
        <p>3. Popover</p>
        <p>4. DatePicker</p>
        <p>5. Collapse</p>
      </div>

      <Footer />
    </>
  )
}

export default SwitchScrollModal
