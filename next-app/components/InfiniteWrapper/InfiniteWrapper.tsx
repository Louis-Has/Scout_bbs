import React, { useEffect, useRef, useState } from 'react'

interface Props {
  content: { text: string }[]
  parentWidth?: number
  top?: number
  directionRight?: boolean
  duration?: number
  step?: number
}

const InfiniteWrapper: React.FC<Props> = (props) => {
  const [cooperationDisplayList, setCooperationDisplayList] = useState<{ text: string }[]>([])
  const [cooperationLeft, setCooperationLeft] = useState<number>(40)
  const [shouldMove, setShouldMove] = useState<boolean>(true)

  const parentDiv = useRef<HTMLDivElement>(null)

  const step = props.step || 10
  const duration = props.duration || 100

  useEffect(() => {
    const clear = setInterval(() => {
      if (!shouldMove) return
      setCooperationLeft(cooperationLeft - step)
    }, duration)
    return () => clearInterval(clear)
  }, [shouldMove, cooperationLeft])

  useEffect(() => {
    // console.log('record', props.parentWidth, Number(parentDiv.current?.clientWidth))

    if ((props.parentWidth || 1920) > Number(parentDiv.current?.clientWidth) + cooperationLeft) {
      // if (!props.directionRight) {
      // console.log('ready to add source', cooperationDisplayList.length)
      // }
      setCooperationDisplayList(cooperationDisplayList.concat(props.content))
    }
  }, [cooperationLeft])

  return (
    <div
      className={'flex space-x-5 absolute transition-all'}
      style={{
        ...{ top: props.top + 'px' },
        ...(props.directionRight
          ? { left: cooperationLeft + 'px' }
          : { right: cooperationLeft + 'px', flexDirection: 'row-reverse' }),
      }}
      ref={parentDiv}
    >
      {cooperationDisplayList.map((item, key) => (
        <div
          className={'p-2.5 bg-white w-max h-[100px] flexCenter'}
          key={key}
          style={{ boxShadow: '0px 2px 19px rgba(53, 58, 73, 0.06)' }}
          onMouseOver={() => {
            setShouldMove(false)
          }}
          onMouseOut={() => {
            setShouldMove(true)
          }}
        >
          <p className={'min-w-[120px]'}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

export default InfiniteWrapper
