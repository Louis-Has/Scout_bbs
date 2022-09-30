import '../styles/globals.css'
import type {AppProps} from 'next/app'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function MyApp({Component, pageProps}: AppProps) {

    return <>
        <Component {...pageProps} />
    </>
}
