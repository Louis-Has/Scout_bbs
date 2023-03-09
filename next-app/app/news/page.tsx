'use client'

import React, { useEffect, useState } from 'react'
import Nav from 'components/Nav/Nav'
import Footer from 'components/Footer/Footer'
import { informations } from 'utils/apis'
import { informationsType, informationType } from 'utils/interface'
import Image from 'next/image'
import moment from 'moment'

const NewsPage: React.FC = () => {
  const tabSource = [
    { text: '企业资讯', type: 'enterprise' },
    { text: '课程动态', type: 'lesson' },
  ]

  const [currentTab, setCurrentTab] = useState<number>(0)

  const [informationSource, setInformationSource] = useState<informationsType>({
    current: 1,
    data: [],
    total: 10,
  })

  const pageSize = 5
  const [currentPage, setCurrentPage] = useState<number>(1)

  useEffect(() => {
    ;(() => {
      informations({
        type: tabSource[currentTab].type as informationType,
        current: currentPage,
        pagesize: pageSize,
      }).then((res) => {
        const data = res.data.data

        setInformationSource(data)
        setCurrentPage(data.current)
      })
    })()
  }, [currentTab, currentPage, pageSize])

  return (
    <>
      <Nav sticky turnBlack />

      <div
        className={
          'h-[720px] bg-[url(/news/04banner.png)] bg-cover text-textWhite font-semibold flexCenter flex-col'
        }
        style={{ textShadow: '0px 5px 5px rgba(0, 0, 0, 0.3)' }}
      >
        <p className={'text-[64px]'}>一目资讯</p>
        <p className={'text-[24px]'}>关于一目可视的任何动态都在这里</p>
      </div>

      <div className={'text-textDeep pb-[120px]'}>
        <div className={'h-86px] flex justify-center space-x-20 bg-fillLight'}>
          {tabSource.map((item, key) => (
            <p
              className={'leading-[86px] text-[20px] font-bold border-textDeep cursor-pointer'}
              key={key}
              onClick={() => {
                setCurrentTab(key)
                setCurrentPage(1)
              }}
              style={currentTab === key ? { borderBottom: '2px solid' } : {}}
            >
              {item.text}
            </p>
          ))}
        </div>

        <div className={'px-20 pt-20 space-y-10 bg-white'}>
          {informationSource.data?.map((item, key) => (
            <div
              className={
                'bg-fillLight h-[280px] flex relative hover:bg-white hover:drop-shadow-[0px_2px_82px_rgba(53,58,73,0.2)] transition-all group cursor-pointer'
              }
              onClick={() => window.open(item.jump_url)}
              key={key}
            >
              <div className={'w-[420px] h-[280px] overflow-hidden'}>
                <Image
                  src={item.cover_url}
                  alt={'cover'}
                  width={420}
                  height={280}
                  className={'group-hover:scale-110 transition-all'}
                />
              </div>
              <div className={'text-textDeep02 ml-[60px] mt-10'}>
                <p className={'text-textDeep text-[24px] font-bold'}>{item.title}</p>
                <p className={'w-[1060px] mt-[78px]'}>{item.abstract}</p>
                <p className={'text-[14px] mt-6'}>{moment(item.release_time).format('YYYY.M.D')}</p>
              </div>

              <div
                className={
                  'absolute right-0 bottom-0 py-3 px-8 bg-textDeep text-textWhite flex items-center group-hover:bg-mainGreen'
                }
              >
                <p className={'text-[20px] font-medium'}>MORE</p>
                <svg className={'icon w-5 h-5 rotate-90 ml-4'} aria-hidden='true'>
                  <use xlinkHref='#icon-fanhuidingbu' />
                </svg>
              </div>
            </div>
          ))}
        </div>

        <div className={'h-12 mt-20 mx-20 flex items-center'}>
          <div
            className={
              'w-12 h-12 border hover:text-textWhite hover:border-mainGreen hover:bg-mainGreen transition-all border-linLightGray text-linLightGray rounded-full flexCenter'
            }
            style={
              currentPage === 1
                ? { borderColor: '#D1D5DC', color: '#D1D5DC', backgroundColor: '#ffffff' }
                : { cursor: 'pointer' }
            }
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          >
            <svg className={'icon w-5 h-5 -rotate-90'} aria-hidden='true'>
              <use xlinkHref='#icon-fanhuidingbu' />
            </svg>
          </div>

          <div className={'grow flex space-x-2 justify-center'}>
            {new Array(Math.ceil(informationSource.total / pageSize)).fill(0).map((item, key) => {
              return (
                <p
                  className={
                    'text-[20px] font-bold text-textDeep02 w-8 h-8 flexCenter cursor-pointer'
                  }
                  key={key}
                  style={currentPage === key + 1 ? { color: '#0FB77A' } : {}}
                  onClick={() => setCurrentPage(key + 1)}
                >
                  {key + 1}
                </p>
              )
            })}
          </div>

          <div
            className={
              'w-12 h-12 border hover:text-textWhite hover:border-mainGreen hover:bg-mainGreen transition-all border-linLightGray text-linLightGray rounded-full flexCenter'
            }
            style={
              currentPage === Math.ceil(informationSource.total / pageSize)
                ? { borderColor: '#D1D5DC', color: '#D1D5DC', backgroundColor: '#ffffff' }
                : { cursor: 'pointer' }
            }
            onClick={() =>
              setCurrentPage(
                Math.min(Math.ceil(informationSource.total / pageSize), currentPage + 1)
              )
            }
          >
            <svg className={'icon w-5 h-5 rotate-90'} aria-hidden='true'>
              <use xlinkHref='#icon-fanhuidingbu' />
            </svg>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default NewsPage
