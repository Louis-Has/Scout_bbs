import React from 'react'
import styles from '@styles/GameOrder.module.scss'
import classNames from 'classnames/bind'
import Nav from '@components/Nav'

const GameOrder: React.FC = () => {
  const cn = classNames.bind(styles)

  return (
    <>
      <Nav />
      <div></div>
    </>
  )
}

export default GameOrder
