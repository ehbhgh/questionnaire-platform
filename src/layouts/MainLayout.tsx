import React, { FC } from 'react'
import { Layout, Spin } from 'antd'
import { Outlet } from 'react-router-dom'
import styles from './css/MainLayout.module.scss'
import Logo from '@/components/Logo'
import UserInfo from '@/components/UserInfo'
import { useLocation } from 'react-router-dom'
import useLoadUserInfoData from '@/hooks/useLoadUserInfoData'
import useNavPage from '@/hooks/useNavPage'
const { Header, Footer, Content } = Layout
const MainLayout: FC = () => {
  const { pathname } = useLocation()
  const { watingUserState } = useLoadUserInfoData()
  useNavPage(watingUserState)
  const LoginElem = (
    <div className={styles.mainBg}>
      <Outlet />
    </div>
  )

  const LayOutElem = (
    <>
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
          {!watingUserState ? (
            <Outlet />
          ) : (
            <div style={{ textAlign: 'center', marginTop: '100px' }}>
              <Spin />
            </div>
          )}
        </Content>

        <Footer className={styles.footer}>问卷调查&copy;2024-paresent ws</Footer>
      </Layout>
    </>
  )
  return <>{pathname == '/login' || pathname === '/regiest' ? LoginElem : LayOutElem}</>
}

export default MainLayout
