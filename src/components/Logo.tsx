import React, { FC } from 'react'
import styles from './css/logo.module.scss'
const Logo: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgLogo}>
        <img src={require('../assets/images/logo.png')} alt="" />
      </div>
    </div>
  )
}

export default Logo
