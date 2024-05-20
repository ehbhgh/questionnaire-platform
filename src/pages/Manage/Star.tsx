import React, { FC } from 'react'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import { useTitle } from 'ahooks'
import { Empty, Typography, Divider, Spin } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import PageList from '@/components/PageList'
import ListSearch from '@/components/ListSearch'
import styles from './css/common.module.scss'
const { Title } = Typography
import type { StarResponseItemInterface } from '@/types/star'
const Star: FC = () => {
  useTitle('问卷调查-星标问卷')
  const { data, loading } = useLoadQuestionListData({ isStar: true })
  const { list, total = 0 } = data
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <Divider style={{ margin: '12px', background: 'transparent' }} />
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: 'center' }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((item: StarResponseItemInterface) => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>
        <PageList total={total} />
      </div>
    </div>
  )
}

export default Star
