'use client'

import React, { useState } from 'react'
import Modal from '../Modal/Modal'
import Image from 'next/image'

interface Props {
  buttonOnClick?: () => void
  bodyStyle?: React.CSSProperties
}

const TopContent: React.FC<Props> = (props) => {
  const [modalWe, setModalWe] = useState<boolean>(false)
  return (
    <>
      <div
        className={'w-full h-[600px] flexCenter bg-[url(/banner.png)] bg-cover'}
        style={props.bodyStyle}
      >
        <div className={'flex items-center flex-col text-textWhite text-[24px] font-medium'}>
          <p className={'text-[72px] font-semibold'}>
            <span>Welcome to</span> <span>Yinghao's Park</span>
          </p>
          <p className={'uppercase mt-[18px]'}>While there is life there is hope</p>

          <button
            className={
              'mt-[50px] px-[32px] py-[10px] border border-white flex items-center hover:bg-mainGreen hover:text-white hover:border-transparent'
            }
            onClick={props.buttonOnClick ? props.buttonOnClick : () => setModalWe(true)}
          >
            <span>联系我</span>
            <svg className={'icon ml-3'} aria-hidden='true'>
              <use xlinkHref='#icon-yuwomenhezuo' />
            </svg>
          </button>
        </div>
      </div>

      <Modal
        open={modalWe}
        onCancel={() => setModalWe(false)}
        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={'px-10 py-6 bg-white rounded-[18px] '}>
          <Image src={'/wechat.jpg'} alt={'yimu'} width={200} height={200} />
          <p className={'text-textDeep text-center'}>扫一扫联系我</p>
        </div>
      </Modal>
    </>
  )
}

export default TopContent
