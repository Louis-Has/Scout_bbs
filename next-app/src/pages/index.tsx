import styles from '@styles/Home.module.scss'
import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

export default function Home() {
  const cn = classNames.bind(styles)
  const router = useRouter()

  return (
    <div className={styles.container}>
      <p>now is 10-17</p>
      <p>try to run actions</p>
      <div className={cn(styles.card)} onClick={() => router.push('/knowledgeRouter')}>
        <p>Knowledge</p>
      </div>
      <div className={cn(styles.card)} onClick={() => router.push('/GameOrder')}>
        <p>GameOrder</p>
      </div>
    </div>
  )
}
