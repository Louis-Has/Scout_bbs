'use client'

import './global.css'
import React, { useEffect } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    require('/public/iconfont')
  }, [])

  return (
    <html lang='en'>
      <body>{children}</body>
    </html>
  )
}
