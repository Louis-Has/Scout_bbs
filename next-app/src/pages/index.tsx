import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import classNames from "classnames/bind";

export default function Home() {
    const cn = classNames.bind(styles)

    const faviconArr = ['吸尘器.svg','收音机.svg','电脑.svg','电视机.svg','空调.svg']
    const num = parseInt(String(Math.random() * 100))%faviconArr.length

  return (
    <div className={styles.container}>
      <Head>
        <title>Welcome to YH Park</title>
        <link rel="icon" href={'/favicon/'+ faviconArr[num]} />
      </Head>
        <p>dsfkheojw</p>

        <svg className={'icon '+ cn('icon')} aria-hidden="true">
            <use xlinkHref="#icon-xichenqiA"></use>
        </svg>

    </div>
  )
}
