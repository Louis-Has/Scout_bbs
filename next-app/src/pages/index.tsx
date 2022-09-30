import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';
import { Button } from 'antd';

export default function Home() {

  const cn = classNames.bind(styles);

  const [queryDate, setQueryData] = useState<any[]>([]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next app</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>


        <Button   type="primary"       >dsda</Button>



        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>


      </main>




      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
