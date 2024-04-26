import React, { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './css/MainLayout.module.scss'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>问卷调查&copy;2024-paresent ws</Footer>
    </Layout>
  )
}

export default MainLayout
