'use client'

import React from 'react'
import Nav from 'components/Nav/Nav'
import FixedTip from 'components/PageComponent/FixedTip'
import TopContent from 'components/PageComponent/TopContent'
import Footer from 'components/PageComponent/Footer'

const Leisure: React.FC = () => {
  return (
    <>
      <Nav />
      <FixedTip />
      <TopContent />

      <div className={'bg-fillLight p-20'}>
        <p className={'text-[20px] my-5'}></p>
      </div>

      <Footer />
    </>
  )
}

export default Leisure
