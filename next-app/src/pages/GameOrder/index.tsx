import Nav from '@components/Nav'
import React, { useEffect } from 'react'
import Head from 'next/head'
import router from 'next/router'

const GameOrder: React.FC = () => {
  return (
    <>
      <Head>
        <title>GameOrder Center</title>
      </Head>
      <Nav />
      <div>
        <p onClick={() => router.push('/GameOrder/Monopoly')}>Monopoly</p>
      </div>
    </>
  )
}

export default GameOrder
