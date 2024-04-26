import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Table, Empty, Modal, Divider, message, Tag, Button, Space } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import styles from './css/common.module.scss'
import ListSearch from '@/components/ListSearch'
import type { TableProps } from 'antd'
interface DataType {
  _id: string
  title: string
  isPublished: boolean
  isStar: boolean
  answerCount: number
  createAt: string
}
const columns: TableProps<DataType>['columns'] = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '是否发布',
    dataIndex: 'isPublished',
    render: (isPublished: boolean) => {
      return isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>
    },
  },
  {
    title: '答卷数量',
    dataIndex: 'answerCount',
  },
  {
    title: '创建时间',
    dataIndex: 'createAt',
  },
]
const rowQuestionList = [
  {
    _id: 'q1',
    title: '问卷1',
    isPublished: false,
    isStar: false,
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
    isStar: false,
    answerCount: 6,
    createAt: '4月22日 09:19:10',
  },
  {
    _id: 'q4',
    title: '问卷4',
    isPublished: false,
    isStar: true,
    answerCount: 15,
    createAt: '4月23日 18:12:52',
  },
]
const { Title } = Typography
const { confirm } = Modal
const Trash: FC = () => {
  useTitle('问卷调查-回收站')
  const [questionList, setQuestionList] = useState(rowQuestionList)
  const [selectIds, setSelectIds] = useState<string[]>([])

  const deleteQuestion = () => {
    confirm({
      title: '确定删除该问卷？',
      content: '删除以后无法找回',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        message.success('删除成功')
      },
    })
  }
  const restoreQuestion = () => {
    console.log('ff')
  }
  const TableItem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button type="primary" onClick={() => restoreQuestion} disabled={selectIds.length === 0}>
            恢复
          </Button>
          <Button danger onClick={deleteQuestion} disabled={selectIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={questionList}
        pagination={false}
        rowKey={q => q._id}
        rowSelection={{
          type: 'checkbox',
          onChange: selectedRowKeys => {
            setSelectIds(selectedRowKeys as string[])
          },
        }}
      />
    </>
  )
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.left}>
            <Title level={3}>回收站</Title>
          </div>
          <div className={styles.right}>
            <ListSearch />
          </div>
        </div>
        <Divider style={{ margin: '12px', background: 'transparent' }} />
        <div className={styles.content}>
          {questionList.length === 0 && <Empty description="暂无数据" />}
          {questionList.length > 0 && TableItem}
        </div>
        <div className={styles.footer}>分页</div>
      </div>
    </>
  )
}

export default Trash
