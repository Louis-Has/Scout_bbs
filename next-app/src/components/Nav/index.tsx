import React from 'react'
import styles from './Nav.module.scss'
import classNames from 'classnames/bind'

const Nav: React.FC = () => {
  const cn = classNames.bind(styles)
  return (
    <div className={cn(styles.container)}>
      <div>YH Park</div>
      <p>knowLedge</p>
      <p>GameOrder</p>
    </div>
  )
}

export default Nav
