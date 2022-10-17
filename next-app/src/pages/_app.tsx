import '@styles/globals.css'
import type {AppProps} from 'next/app'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Head from 'next/head'

export default function MyApp({Component, pageProps}: AppProps) {
  if (typeof window !== 'undefined') {
    require('/public/iconfont')
  }

  const faviconArr = ['吸尘器.svg', '收音机.svg', '电脑.svg', '电视机.svg', '空调.svg']
  const num = parseInt(String(Math.random() * 100)) % faviconArr.length

  return <>
    <Head>
      <title>Welcome to YH Park</title>
      <link rel="icon" href={'/favicon/' + faviconArr[num]}/>
    </Head>
    <Component {...pageProps} />
  </>
}
