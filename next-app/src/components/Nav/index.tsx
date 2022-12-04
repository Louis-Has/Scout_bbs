import React from 'react'
import styles from './Nav.module.scss'
import classNames from 'classnames/bind'
import { useRouter } from 'next/router'

const Nav: React.FC = () => {
  const cn = classNames.bind(styles)
  const router = useRouter()

  return (
    <div className={cn(styles.container)}>
      <p className={styles.button} onClick={() => router.push('/')}>
        YH Park
      </p>
      <p className={styles.button}>knowLedge</p>
      <p className={styles.button}>GameOrder</p>
    </div>
  )
}

export default Nav
