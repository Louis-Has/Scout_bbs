import styles from '@styles/knowledgeRouter.module.scss'
import classNames from 'classnames/bind'
import Head from 'next/head'
import { Tabs } from 'antd'
import { ReactNode, useState } from 'react'
import { getPublicStaticsList, modalData } from '@utils/api'

const knowledgeRouter = () => {
  const cn = classNames.bind(styles)

  const [tabsActiveKey, setTabsActivityKey] = useState<string>('0')
  const [queryData, setQueryData] = useState<modalData[]>([])

  // modal
  const [showModal, setShowModal] = useState<boolean>(false)
  const [modalKey, setModalKey] = useState<number>()

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

      <div className={cn('container')} style={{ position: showModal ? 'fixed' : 'initial' }}>
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
        <div className={cn(styles.content)}>
          <img src={queryData[modalKey]?.tmpUrl} alt='tmpImg' />
        </div>
      </div>
    </>
  )
}

export default knowledgeRouter
