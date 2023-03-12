'use client'

import React from 'react'
import Nav from 'components/Nav/Nav'
import FixedTip from 'components/PageComponent/FixedTip'
import Footer from 'components/PageComponent/Footer'
import TopContent from 'components/PageComponent/TopContent'
import StepTimeAnimation from 'components/StepTimeAnimation/StepTimeAnimation'

const StepTime: React.FC = () => {
  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'bg-fillLight p-20'}>
        <p className={'text-[24px] my-5'}>
          需求：分一幕幕展示内容，且下方有一条时间轴，时间轴能表示当前的 step ，且能控制快进回退
        </p>
        <p>思路：用时间轴控制当前进度，每个进度分多个阶段，实现不同组内容的替换效果</p>
        <p>1. 绘制时间轴，并且计算当前 step 的长度，父级 width 不够时整个时间轴往左移</p>
        <p>2. 用 useEffect 监控状态变化，setTimeout 控制变化，结合样式做出 等待、切换、过渡动画</p>
        <p>3. 左右两个控制按钮通过设置 step 快速进入上（返回下）一组内容</p>
      </div>

      <StepTimeAnimation />

      <Footer />
    </>
  )
}

export default StepTime
