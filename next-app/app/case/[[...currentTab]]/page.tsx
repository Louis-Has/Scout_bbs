'use client'

import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import { useRouter } from 'next/navigation'
import { cases, someCase } from 'utils/apis'
import { casesIn, casesType, someCaseType } from 'utils/interface'
import Image from 'next/image'
import Modal from 'components/Modal/Modal'

interface Props {
  params: { currentTab: string }
}

const CasePage: React.FC<Props> = (props) => {
  const router = useRouter()

  const tabSource = [
    {
      text: '医学生物插画',
      pathname: 'illustration',
      title: '医学生物插画',
      subTitle: '为商业活动服务的实用型医学生物插画',
    },
    {
      text: '医疗广告宣传',
      pathname: 'ad',
      title: '医疗广告宣传',
      subTitle: '医疗产品宣传推广，令人惊叹的3D数字艺术',
    },
    {
      text: '医疗品牌全案',
      pathname: 'brand',
      title: '医学生物插画',
      subTitle: '为商业活动服务的实用型医学生物插画',
    },
  ]

  const currentTabNum: number = Math.max(
    tabSource.findIndex((item) => item.pathname === props.params.currentTab?.[0]),
    0
  )

  const [caseSource, setCaseSource] = useState<casesType[]>([])

  useEffect(() => {
    ;(async () => {
      await cases({ type: tabSource[currentTabNum].pathname as casesIn }).then((res) =>
        setCaseSource(res.data.data)
      )
    })()
  }, [currentTabNum])

  const [modal, setModal] = useState<boolean>(false)
  const [someCaseSource, setSomeCaseSource] = useState<someCaseType>()

  async function handleQueryDetailData(id: string) {
    setModal(true)
    await someCase(id).then((res) => setSomeCaseSource(res.data.data))
  }

  const [modalWe, setModalWe] = useState<boolean>(false)

  return (
    <>
      <Nav sticky turnBlack />

      <div
        className={
          'bg-[url(/case/llustration/casebanner.png)] bg-cover h-[720px] flexCenter flex-col text-textWhite font-semibold'
        }
        style={{ textShadow: '0px 5px 5px rgba(0, 0, 0, 0.3)' }}
      >
        <p className={'text-[64px]'}>我们的案例</p>
        <p className={'text-[24px] mt-[18px]'}>将医学知识融合设计经验，对每一个细节精雕细琢</p>
      </div>

      <div className={'h-max text-textDeep text-[20px] pb-[120px]'}>
        <div className={'h-[86px] flex bg-fillLight space-x-[80px] justify-center'}>
          {tabSource.map((item, key) => (
            <p
              className={'font-semibold border-textDeep leading-[86px] cursor-pointer'}
              style={
                tabSource[currentTabNum].pathname === item.pathname
                  ? { borderBottom: '2px solid' }
                  : {}
              }
              key={key}
              onClick={() => router.push('/case/' + item.pathname)}
            >
              {item.text}
            </p>
          ))}
        </div>

        <div className={'pt-[80px] flex flex-col items-center'}>
          <p>{tabSource[currentTabNum].title}</p>
          <p className={'text-[32px] font-medium mt-6'}>{tabSource[currentTabNum].subTitle}</p>

          <div className={'flex flex-wrap justify-center'}>
            {caseSource.map((item, key) => (
              <div
                className={
                  'w-[560px] h-[488px] border-b border-fillDeep mx-5 mt-[35px] cursor-pointer group'
                }
                key={key}
                onClick={() => handleQueryDetailData(item.id)}
              >
                <div className={'w-[560px] h-[372px] overflow-hidden relative'}>
                  <Image
                    src={item.cover.cover_url}
                    width={560}
                    height={372}
                    alt={'cover'}
                    className={'group-hover:scale-110 transition-all'}
                  />

                  <p
                    className={
                      'hidden group-hover:block absolute top-6 left-6 text-textWhite text-[24px] font-bold'
                    }
                  >
                    {item.remarks}
                  </p>
                  {item.cover.type !== 'video' || (
                    <div className={'absoluteCenter flexCenter w-full h-full bg-[#00000033]'}>
                      <svg className={'icon w-[60px] h-[60px] text-[#FFFFFFCC]'} aria-hidden='true'>
                        <use xlinkHref='#icon-play' />
                      </svg>
                    </div>
                  )}
                </div>

                <p className={'text-[24px] font-bold mt-8 group-hover:text-mainGreen'}>
                  {item.title}
                </p>
                <p className={'text-textDeep02 text-[16px] mt-2'}>{item.subtitle}</p>
              </div>
            ))}
          </div>
          <p className={'text-[20px] font-medium mt-[100px]'}>仅展示部分案例</p>
          <p className={'text-[40px] font-semibold mt-6'}>更多作品可咨询我们查看</p>

          <button
            className={'bg-mainGreen px-6 py-[10px] text-textWhite text-[20px] rounded-[34px] mt-8'}
            onClick={() => setModalWe(true)}
          >
            立即查看
          </button>
        </div>
      </div>

      <Modal open={modal} onCancel={() => setModal(false)}>
        {!someCaseSource || (
          <div
            className={'w-full mt-20 bg-fillDeep pt-6 pb-[100px] rounded-t-[20px]'}
            style={{ height: 'calc(100% - 80px)' }}
          >
            <svg
              className={'icon w-8 h-8 absolute top-9 right-5 text-textWhite cursor-pointer'}
              aria-hidden='true'
              onClick={() => setModal(false)}
            >
              <use xlinkHref='#icon-close' />
            </svg>

            <div className={'w-[1000px] h-full mx-auto'}>
              <p className={'text-textWhite text-[24px] font-bold'}>{someCaseSource.title}</p>
              <p className={'text-textDeep02 mt-2'}>{someCaseSource.subtitle}</p>

              <div className={'h-full overflow-hidden'}>
                <div className={'h-full overflow-auto'} style={{ width: 'calc(100% + 15px)' }}>
                  {someCaseSource.detail.map((item, key) => {
                    switch (item.type) {
                      case 'image':
                        return (
                          <img src={item.content} alt='img' className={'mt-6 w-full'} key={key} />
                        )
                      case 'video':
                        return (
                          <video
                            src={item.content}
                            className={'mt-6 w-full'}
                            key={key}
                            controls
                            controlsList={'nodownload'}
                          />
                        )
                      case 'text':
                        return (
                          <p className={'mt-6 w-full text-fillLight whitespace-pre-line'} key={key}>
                            {item.content}
                          </p>
                        )
                    }
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={modalWe}
        onCancel={() => setModalWe(false)}
        bodyStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={'px-10 py-6 bg-white rounded-[18px] '}>
          <Image src={'/wechat.jpg'} alt={'yimu'} width={200} height={200} />
          <p className={'text-textDeep text-center'}>扫一扫关注公众号</p>
        </div>
      </Modal>

      <Footer />
    </>
  )
}

export default CasePage
