'use client'

import React, { useState } from 'react'
import Nav from 'components/Nav/Nav'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'
import Footer from 'components/PageComponent/Footer'
import Masonry from 'components/Masonry/Masonry'

const Waterfall: React.FC = () => {
  const [customWidth, setCustomWidth] = useState<number>(240)

  const waterFallSource: { img: string; title: string }[] = [
    { img: 'https://i.pinimg.com/474x/29/0b/6a/290b6a41fab065f5da4e1625314d0797.jpg', title: '1' },
    { img: 'https://i.pinimg.com/474x/3c/c6/2e/3cc62ec958d8fe521f9917339a3b6d81.jpg', title: '2' },
    { img: 'https://i.pinimg.com/474x/3d/b5/78/3db57854680f078188256212138c518f.jpg', title: '3' },
    { img: 'https://i.pinimg.com/474x/8d/fd/a0/8dfda0f1a44ae3f5649d0850a80c5e2b.jpg', title: '4' },
    { img: 'https://i.pinimg.com/474x/fc/bf/e4/fcbfe4292e59f8a310e94139d30e7c9d.jpg', title: '5' },
    { img: 'https://i.pinimg.com/474x/74/fc/1c/74fc1cc29cd5b9e1697b9ad2f6da58c1.jpg', title: '6' },
    { img: 'https://i.pinimg.com/474x/c2/87/ed/c287ed8fae8806b6cbe3adb367c7f371.jpg', title: '7' },
    { img: 'https://i.pinimg.com/474x/a8/05/c9/a805c99e9f874dd8b5cc89f8920bc42d.jpg', title: '8' },
    { img: 'https://i.pinimg.com/474x/3b/81/78/3b817884bf1d1727a134cb7cfd9a00e1.jpg', title: '9' },
    { img: 'https://i.pinimg.com/474x/b4/2c/01/b42c018727301bcfd7a95d253ccd7478.jpg', title: '10' },
    { img: 'https://i.pinimg.com/474x/4b/d5/e4/4bd5e44d393867a20500dbdab73e3bfe.jpg', title: '11' },
    { img: 'https://i.pinimg.com/474x/8c/3d/89/8c3d8927819d43053410b9b99d18c745.jpg', title: '12' },
    { img: 'https://i.pinimg.com/474x/60/e7/d4/60e7d4dd1cb9c9a5cc5546c25dfc27d5.jpg', title: '13' },
    { img: 'https://i.pinimg.com/474x/1a/4a/a2/1a4aa2511fbf039f8bf9ffac53e01db6.jpg', title: '14' },
    { img: 'https://i.pinimg.com/474x/df/d4/d4/dfd4d4752bde6c72c3c58559fa1ab5ae.jpg', title: '15' },
    { img: 'https://i.pinimg.com/736x/29/f6/ba/29f6bab7893acb512e51db76e33cbba6.jpg', title: '16' },
    { img: 'https://i.pinimg.com/474x/85/20/ea/8520ead498631ff7a849cce3dc785098.jpg', title: '17' },
    { img: 'https://i.pinimg.com/474x/e3/08/9e/e3089e014737b02d59f2cc6b65501bcd.jpg', title: '18' },
    { img: 'https://i.pinimg.com/474x/2b/b9/82/2bb98296b5d724c007d55a2b3e462121.jpg', title: '19' },
  ]

  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'bg-fillLight p-20'}>
        <p className={'text-[24px] my-5'}>
          需求：实现瀑布流布局，要求能寻找最高的空位排布，实现虚拟化避免卡顿
        </p>
        <p>思路：先按 width 计算出当前有几列，再维护一个记录每列高度的数组，依次判断当前最高是哪列，给图片设置相应的位置属性</p>
        <p>1. 从父元素 width 及单个素材的宽度计算出列数</p>
        <p>2. 维护一个长度为列数的数组，记录每次动作的每列高度</p>
        <p>3. 遍历素材资源，每次都找出最高是哪列，给设置相应的 left 和 top ，再更新列高度数组</p>
        <p>4. 设置区域虚拟化，除了视图区域和缓冲区域，设置 none ，避免不必要的渲染</p>
        <p>5. 把最高的列高度赋给 父元素，保证父元素与其他元素的布局正常</p>
      </div>

      <div>
        <input
          type='range'
          min={120}
          max={480}
          value={customWidth}
          onChange={(event) => setCustomWidth(Number(event.target.value))}
          className={'ml-40'}
        />
        <Masonry queryData={waterFallSource} bodyStyle={{ margin: '16px' }} width={customWidth} />
      </div>
      <Footer />
    </>
  )
}

export default Waterfall
