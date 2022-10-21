import styles from '@styles/knowledgeRouter.module.scss'
import classNames from 'classnames/bind'
import Head from 'next/head'
import { Tabs } from 'antd'
import { ReactNode, useEffect, useState } from 'react'
import { getPublicStaticsList, modalData } from '@utils/api'

const knowledgeRouter = () => {
  const cn = classNames.bind(styles)

  const [tabsActiveKey, setTabsActivityKey] = useState<string>('0')
  const [queryData, setQueryData] = useState<modalData[]>([])

  // modal
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalKey, setModalKey] = useState<number>()

  // current active div
  const [activeEle, setActiveEle] = useState<number>(undefined)
  const [currentX, setCurrentX] = useState<number>(0)
  const [currentY, setCurrentY] = useState<number>(0)

  const TabsChildren: ReactNode = (
    <>
      {queryData.length ? (
        <div className={styles.content}>
          {queryData.map((item, key) => (
            <div
              className={cn('item')}
              onClick={() => {
                setShowModal(true)
                setModalKey(key)
              }}
              key={key}
            >
              <img src={item.tmpSmallUrl} alt='tmpSmall' />
            </div>
          ))}
        </div>
      ) : (
        <p onClick={() => setShowModal(true)}>请先点击任意tab</p>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>Knowledge Card</title>
      </Head>

      <div
        className={cn('container')}
        style={showModal ? { position: 'fixed', top: -window.scrollY } : {}}
      >
        <p>展示几个card效果</p>
        <Tabs
          activeKey={tabsActiveKey}
          centered
          type={'card'}
          onChange={(key) => {
            setTabsActivityKey(key)
            getPublicStaticsList(key).then((res) => {
              const { success, data } = res
              if (success && data) {
                setQueryData(data)
              }
            })
          }}
          items={[
            {
              label: '滑动标注式Card',
              key: '0',
              children: TabsChildren,
            },
            {
              label: '场景标注式Card',
              key: '1',
              children: TabsChildren,
            },
            {
              label: '搜索卡片式Card',
              key: '2',
              children: TabsChildren,
            },
          ]}
        ></Tabs>
      </div>

      <div
        className={cn(styles.modal)}
        style={{ display: showModal ? 'flex' : 'none' }}
        onClick={() => setShowModal(false)}
      >
        <div
          className={cn(styles.modalContent)}
          onClick={(e) => e.stopPropagation()}
          onMouseUp={() => {
            setActiveEle(undefined)
            console.log('now is mouseup')
          }}
          onMouseMove={(event) => {
            console.log('rewrite location')
            setCurrentX(event.clientX)
            setCurrentY(event.clientY)
          }}
        >
          {['ready to move1', 'ready to move2'].map((item, key) => {
            const [move, setMove] = useState<boolean>(false)

            const [currentEleX, setCurrentEleX] = useState<number>(0)
            const [currentEleY, setCurrentEleY] = useState<number>(0)
            if (activeEle === key) {
              console.log('now is the mousedown', key)
              // setCurrentEleX(currentEleX)
              // setCurrentEleY(currentEleY)
            }
            // const storeLocation = (e: MouseEvent) => {
            //   if (move) {
            //     console.log('should', e)
            //     setCurrentX(e.offsetX)
            //     setCurrentY(e.offsetY)
            //   }
            // }
            //
            // useEffect(() => {
            //   window.addEventListener('mousemove', storeLocation)
            //   return () => window.removeEventListener('mousemove', storeLocation)
            // }, [move])

            useEffect(() => {})
            return (
              <div
                className={cn(styles.controlDiv)}
                style={{ top: currentEleY, left: currentEleX }}
                onMouseDown={() => setActiveEle(key)}
                key={key}
              >
                {item}
              </div>
            )
          })}
          {/*<div*/}
          {/*  draggable*/}
          {/*  className={cn(styles.controlDiv)}*/}
          {/*  style={{ top: currentY, left: currentX }}*/}
          {/*  onDragEnd={(event) => {*/}
          {/*    setCurrentX(event.clientX)*/}
          {/*    setCurrentY(event.clientY)*/}
          {/*  }}*/}
          {/*>*/}
          {/*  ready to move*/}
          {/*</div>*/}
          {/*<div className={cn(styles.sideDes)}>*/}
          {/*  {['弹窗必不可少', '滑到内容的尽头时，再继续', '演示：阻止链接跳转的默认行为'].map(*/}
          {/*    (item, key) => {*/}
          {/*      const mainDiv = useRef<HTMLDivElement>()*/}
          {/*      const [distance, setDistance] = useState<number>()*/}
          {/*      // let distance*/}

          {/*      useEffect(() => {*/}
          {/*        setDistance(mainDiv.current.offsetLeft)*/}
          {/*        // distance = mainDiv.current.offsetLeft*/}
          {/*        console.log('now ready to write', mainDiv.current.offsetLeft)*/}
          {/*      }, [showModal])*/}
          {/*      return (*/}
          {/*        <div*/}
          {/*          key={key}*/}
          {/*          className={cn(styles.sideTap)}*/}
          {/*          ref={mainDiv}*/}
          {/*          onClick={() => console.log(mainDiv.current.offsetLeft, distance)}*/}
          {/*        >*/}
          {/*          {item}*/}
          {/*          <div*/}
          {/*            style={{ height: '1px', width: `${distance}px` }}*/}
          {/*            className={cn(styles.sideTapLine)}*/}
          {/*          />*/}
          {/*        </div>*/}
          {/*      )*/}
          {/*    }*/}
          {/*  )}*/}
          {/*</div>*/}
          {/*<img src={queryData[modalKey]?.tmpUrl} alt='tmpImg' />*/}
          {/*<div className={cn(styles.sideDes)}></div>*/}
        </div>
      </div>
    </>
  )
}

export default knowledgeRouter
