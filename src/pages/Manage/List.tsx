import React, { FC } from 'react'
import { useTitle } from 'ahooks'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { Typography, Divider, Spin } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './css/common.module.scss'
const { Title } = Typography

const List: FC = () => {
  useTitle('问卷调查-我的问卷')
  const { data, loading } = useLoadQuestionListData()
  const { list, total = 0 } = data
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Divider style={{ margin: '12px', background: 'transparent' }} />
      <div className={styles.content}>
        {loading ? (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        ) : (
          list.length > 0 && list.map((item: any) => <QuestionCard key={item._id} {...item} />)
        )}
      </div>
      <div className={styles.footer}>上划加载更多...</div>
    </div>
  )
}

export default List
