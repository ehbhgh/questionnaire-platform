import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { Spin } from 'antd'
import useNavPage from '@/hooks/useNavPage'
import useLoadUserInfoData from '@/hooks/useLoadUserInfoData'
import styles from './css/QuestionLayout.module.scss'
const QusetionLayout: FC = () => {
  const { watingUserState } = useLoadUserInfoData()
  useNavPage(watingUserState)
  return (
    <div className={styles.layoutContainer}>
      <div>
        {watingUserState ? (
          <div style={{ marginTop: '60px', textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  )
}

export default QusetionLayout
