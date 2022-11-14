import styles from '@styles/knowledgeRouter.module.scss'
import classNames from 'classnames/bind'
import Head from 'next/head'
import { Tabs } from 'antd'
import { ReactNode, useEffect, useRef, useState } from 'react'
import { getPublicStaticsList, modalData } from '@utils/api'

const knowledgeRouter = () => {
  const cn = classNames.bind(styles)

  const [tabsActiveKey, setTabsActivityKey] = useState<string>('0')
  const [queryData, setQueryData] = useState<modalData[]>([])

  // modal
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [modalKey, setModalKey] = useState<number>()
  const modalContent = useRef<HTMLDivElement>()

  // modal Img
  const modalImg = useRef<HTMLImageElement>()

  // current active div
  const [activeEle, setActiveEle] = useState<number>(undefined)
  const [currentX, setCurrentX] = useState<number>(0)
  const [currentY, setCurrentY] = useState<number>(0)
  // contentTag
  const [modalTag, setModalTag] = useState([
    { context: 'ready to move1', left: 30, top: 20, pointLeft: 80, pointTop: 40 },
    { context: 'ready to move2', left: 80, top: 40, pointLeft: 40, pointTop: 60 },
  ])

  useEffect(() => {
    setModalTag(
      modalTag.map((itemSet, keySet) =>
        keySet === activeEle
          ? {
              ...itemSet,
              left: (currentX / modalContent.current?.offsetWidth) * 100,
              top: (currentY / modalContent.current?.offsetHeight) * 100,
            }
          : itemSet
      )
    )
  }, [currentX, currentY])

  const TabsChildren: ReactNode = (
    <>
      {queryData.length ? (
        <div className={styles.content}>
          {queryData.map((item, key) => (
            <div
              className={cn('item')}
              onClick={() => {
                setModalShow(true)
                setModalKey(key)
              }}
              key={key}
            >
              <img src={item.tmpSmallUrl} alt='tmpSmall' />
            </div>
          ))}
        </div>
      ) : (
        <p>请先点击任意tab</p>
      )}
    </>
  )

  return (
    <>
      <Head>
        <title>Knowledge Card</title>
      </Head>

      <div className={cn(styles.container)} style={modalShow ? { position: 'fixed', top: -window.scrollY } : {}}>
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

      <div className={cn(styles.modal, { [styles.modalActive]: modalShow })} onClick={() => setModalShow(false)}>
        <div
          className={cn(styles.modalContent)}
          onClick={(e) => e.stopPropagation()}
          onMouseUp={() => {
            setActiveEle(undefined)
            // console.log('now is mouseup')
          }}
          onMouseMove={(event) => {
            // console.log('rewrite location', event)
            setCurrentX(event.clientX - modalContent.current.offsetLeft)
            setCurrentY(event.clientY - modalContent.current.offsetTop)
          }}
          ref={modalContent}
        >
          <img className={cn(styles.controlImg)} src={queryData[modalKey]?.tmpUrl} alt='tmpUrl' ref={modalImg} />

          {modalTag.map((item, key) => {
            // console.log(modalImg)
            const currentTagX = (item.left * modalContent.current?.offsetWidth) / 100 || 0
            const currentTagY = (item.top * modalContent.current?.offsetHeight) / 100 || 0

            const currentImgX =
              modalImg.current?.offsetLeft + (modalImg.current?.offsetWidth * item.pointLeft) / 100 || 0
            const currentImgY =
              modalImg.current?.offsetTop + (modalImg.current?.offsetHeight * item.pointTop) / 100 || 0

            const tagLineStrokeWidth = activeEle === key ? 4 : 2

            console.log(currentTagX, currentTagY, modalContent)

            return (
              <div className={cn(styles.controlContent)} key={key}>
                <div
                  className={cn(styles.controlDiv)}
                  style={{
                    left: currentTagX,
                    top: currentTagY,
                  }}
                  onMouseDown={() => {
                    setActiveEle(key)
                  }}
                >
                  {item.context}
                </div>
                <svg
                  width={modalContent.current?.offsetWidth}
                  height={modalContent.current?.offsetHeight}
                  style={{ top: 0 }}
                >
                  <line
                    x1={currentTagX}
                    y1={currentTagY}
                    x2={currentImgX}
                    y2={currentTagY}
                    stroke='black'
                    strokeWidth={tagLineStrokeWidth}
                  />
                  <line
                    x1={currentImgX}
                    y1={currentTagY}
                    x2={currentImgX}
                    y2={currentImgY}
                    stroke='black'
                    strokeWidth={tagLineStrokeWidth}
                  />
                </svg>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default knowledgeRouter
