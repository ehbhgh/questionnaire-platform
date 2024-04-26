import React, { FC, useState } from 'react'
// import { useSearchParams } from 'react-router-dom'
import { useTitle } from 'ahooks'
import { Empty, Typography, Divider } from 'antd'
import QuestionCard from '@/components/QuestionCard'
import ListSearch from '@/components/ListSearch'
import styles from './css/common.module.scss'
const { Title } = Typography
const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createAt: '4月24日 14:29:00',
  },
  {
    _id: 'q2',
    title: '问卷2',
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createAt: '4月24日 10:20:03',
  },
  {
    _id: 'q3',
    title: '问卷3',
    isPublished: true,
    isStar: true,
    answerCount: 6,
    createAt: '4月22日 09:19:10',
  },
]
const Star: FC = () => {
  useTitle('问卷调查-星标问卷')
  const [questionList, setQuestionList] = useState(rowQuestionList)
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
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map(item => <QuestionCard key={item._id} {...item} />)}
      </div>
      <div className={styles.footer}>分页</div>
    </div>
  )
}

export default Star
