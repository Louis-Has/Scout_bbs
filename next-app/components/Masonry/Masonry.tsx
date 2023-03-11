'use client'

import React, { CSSProperties, useEffect, useState } from 'react'

interface Props {
  queryData: { img: string; title: string }[]
  collectFun?: () => void
  margin?: number
  width?: number
  bodyStyle?: CSSProperties
}

const Masonry: React.FC<Props> = ({ queryData, collectFun, margin = 20, width = 348, bodyStyle }) => {
  const [reallyWidth, setReallyWidth] = useState<number>(0) // the real width of content images
  const [imgPosition, setImgPosition] = useState<{ left: number; top: number }[]>([]) // the position of content images
  const [finalHeight, setFinalHeight] = useState<number>(0)

  const rootName = 'masonry'
  const imgName = 'img'

  useEffect(() => {
    window.addEventListener('resize', resizePosition)
    return () => window.removeEventListener('resize', resizePosition)
  })

  useEffect(() => {
    resizePosition()
  }, [])

  const resizePosition = () => {
    const rootContainerWidth = document.getElementById(rootName)?.clientWidth // the masonry width
    const cols = Math.floor(((rootContainerWidth || 0) + margin) / (margin + width)) // the content cols of masonry
    const reallyWidth = ((rootContainerWidth || 0) + margin) / cols - margin
    setReallyWidth(reallyWidth)

    // console.log(
    //   'this is the parent element',
    //   rootContainerWidth,
    //   document.getElementsByClassName(imgName)
    // )
    const imgCollection = document.getElementsByClassName(imgName) as HTMLCollectionOf<HTMLImageElement>

    const sizeData = [] // the original size of content images
    for (let i = 0; i < imgCollection.length; i++) {
      sizeData.push({
        width: imgCollection[i].naturalWidth,
        height: imgCollection[i].naturalHeight,
      })
    }

    const totalHeight = new Array(cols).fill(0)

    const positionData = sizeData.map((item) => {
      const min = Math.min(...totalHeight)
      const minIndex = totalHeight.indexOf(min)
      totalHeight[minIndex] += (item.height * reallyWidth) / item.width + margin + 28

      return { left: minIndex * (reallyWidth + margin), top: min }
    })
    // console.log(positionData, sizeData)
    setImgPosition(positionData)
    setFinalHeight(Math.max(...totalHeight))
  }

  return (
    <div className={'relative'} id={rootName} style={{ ...bodyStyle, ...{ height: finalHeight || 0 } }}>
      {/*<button onClick={resizePosition} style={{ position: 'absolute', top: '-40px' }}>*/}
      {/*  check me*/}
      {/*</button>*/}
      {/*<button onClick={() => setImgPosition([])} style={{ position: 'absolute', top: '-80px' }}>*/}
      {/*  drop data*/}
      {/*</button>*/}

      {queryData.map((item, key) => {
        return (
          <div
            className={'absolute transition-all group'}
            key={key}
            style={{
              width: (reallyWidth || width) + 'px',
              left: imgPosition[key]?.left || 0,
              top: imgPosition[key]?.top || 0,
            }}
            onClick={() => {
              // router.push('/pins')
              console.log('go pins')
            }}
          >
            <div className={'w-full border border-[#e4e8e8]'}>
              <div className={'hidden group-hover:block absolute bottom-0 w-full h-full'}>
                <div
                  className={'absolute right-5 bottom-5 w-10 h-10 rounded-[8px] flexCenter cursor-pointer'}
                  onClick={(event) => {
                    event.stopPropagation()
                    collectFun?.()
                  }}
                >
                  <svg className={'icon'} aria-hidden='true'>
                    <use xlinkHref='#icon-qingxuban' />
                  </svg>
                </div>
              </div>
              <img
                src={item.img}
                alt='masonry'
                className={imgName + ' w-full'}
                onLoad={(event) => {
                  resizePosition()
                }}
              />
            </div>
            <div className={'mt-2 h-5 flex items-center'}>
              <p className={''}>{item.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Masonry
