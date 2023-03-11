'use client'

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface Props {
  sticky?: boolean
  turnTransparent?: boolean
}

const Nav: React.FC<Props> = (props) => {
  const route = useRouter()
  const pathname = usePathname()

  const [currentTab, setCurrentTab] = useState<number>()
  const navSource = [
    { title: '首页介绍', pathname: '/' },
    { title: '组件详解', pathname: '/component' },
    { title: '语法总结', pathname: '/grammar' },
    { title: '闲暇探索', pathname: '/leisure' },
  ]

  useEffect(() => {
    setCurrentTab(navSource.findIndex((item) => item.pathname.includes(pathname)))
  }, [pathname])

  return (
    <>
      <div
        className={'w-full h-20 top-0 flexCenter px-20 z-10'}
        style={{
          ...(props.sticky ? { position: 'sticky' } : { position: 'fixed' }),
          ...(props.turnTransparent
            ? { color: '#ffffff' }
            : {
                boxShadow: '0px 2px 19px rgba(53, 58, 73, 0.06)',
                background: '#ffffff90',
                backdropFilter: 'blur(6px)',
                color: '#353B45',
              }),
        }}
      >
        <p className={'text-[32px]'}>YH Park</p>

        <div className={'grow'} />

        <div className={'flexCenter font-bold'}>
          <div className={'flex space-x-[60px]'}>
            {navSource.map((item, key) => (
              <p
                className={'border-mainGreen leading-[60px] cursor-pointer transition-all hover:border-b-2'}
                style={currentTab === key ? { borderBottomWidth: '2px' } : {}}
                key={key}
                onClick={() => {
                  if (item.pathname.includes('http')) {
                    window.open(item.pathname)
                  } else {
                    route.push(item.pathname)
                  }
                }}
              >
                {item.title}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
