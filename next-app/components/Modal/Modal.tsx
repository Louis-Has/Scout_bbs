'use client'

import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

interface Props extends PropsWithChildren {
  open: boolean
  onCancel: () => void
  bodyStyle?: React.CSSProperties
}

const Modal: React.FC<Props> = (props) => {
  const [mounted, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const [modalScrollY, setModalScrollY] = useState<number>(0)

  useEffect(() => {
    window.addEventListener('scroll', recodeScrollY)
    return () => window.removeEventListener('scroll', recodeScrollY)
  })

  const recodeScrollY = () => {
    if (!props.open) setModalScrollY(window.scrollY)
  }

  // fix Hydration failed
  useEffect(() => {
    setMounted(true)
    const root = document.documentElement
    if (props.open) {
      if (root.scrollHeight !== root.clientHeight) root.style.paddingRight = '15px'
      root.style.position = 'fixed'
      root.style.top = -modalScrollY + 'px'
      root.style.width = '100%'
    } else {
      root.style.position = 'initial'
      root.style.paddingRight = '0'
    }
  }, [props.open])

  useEffect(() => {
    if (!document.scrollingElement) return
    if (mounted) document.scrollingElement.scrollTop = modalScrollY
  }, [props.open, modalScrollY])

  return mounted
    ? createPortal(
        <div
          className={
            'fixed z-50 w-full h-full top-0 pr-0 bg-[#33333399] invisible transition-all opacity-0 overflow-auto'
          }
          style={{
            ...props.bodyStyle,
            ...(props.open ? { opacity: '1', visibility: 'visible' } : {}),
          }}
          ref={containerRef}
          onClick={(event) => {
            if (containerRef.current === event.target) props.onCancel()
          }}
        >
          {props.children}
        </div>,
        document.getElementsByTagName('body')[0]
      )
    : null
}

export default Modal
