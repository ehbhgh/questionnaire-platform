import React, { FC } from 'react'
import { Typography, Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './css/home.module.scss'
import { RouterPath } from '@/constant'
const { Title, Paragraph } = Typography
const Home: FC = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.container}>
      <div className={styles.container_item}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>已累计创建问卷200份，发布问卷120份，收到答卷980份</Paragraph>
        <div className={styles.btn_area}>
          <Button type="primary" onClick={() => navigate(RouterPath.MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
