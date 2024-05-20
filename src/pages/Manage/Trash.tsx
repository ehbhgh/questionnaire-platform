import React, { FC, useState } from 'react'
import { useTitle } from 'ahooks'
import { Typography, Table, Empty, Spin, Modal, Divider, message, Tag, Button, Space } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
import useLoadQuestionListData from '@/hooks/useLoadQuestionListData'
import styles from './css/common.module.scss'
import ListSearch from '@/components/ListSearch'
import type { TableProps } from 'antd'
import type { DataType } from '@/types/trash'
import PageList from '@/components/PageList'
import { useRequest } from 'ahooks'
import { updateQuestionService, deleteQuestionService } from '@/apis/qusetion'

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

const { Title } = Typography
const { confirm } = Modal
const Trash: FC = () => {
  useTitle('问卷调查-回收站')
  const [selectIds, setSelectIds] = useState<string[]>([])
  const { data, loading, refresh } = useLoadQuestionListData({ isDeleted: true })
  const { list, total = 0 } = data
  const deleteQuestion = () => {
    confirm({
      title: '确定删除该问卷？',
      content: '删除以后无法找回',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        deleteQuestionRun()
      },
    })
  }
  const refreshList = (msg: string) => {
    message.success(msg)
    refresh()
    setSelectIds([])
  }
  //恢复
  const { loading: restoreLoad, run: restoreQuestion } = useRequest(
    async () => {
      for await (const id of selectIds) {
        await updateQuestionService(id, {
          isDeleted: false,
        })
      }
    },
    {
      manual: true,
      onSuccess: () => {
        refreshList('恢复成功')
      },
    }
  )

  //删除
  const { run: deleteQuestionRun } = useRequest(
    async () => await deleteQuestionService(selectIds),
    {
      manual: true,
      onSuccess: () => {
        refreshList('删除成功')
      },
    }
  )

  const TableItem = (
    <>
      <div style={{ marginBottom: '16px' }}>
        <Space>
          <Button
            type="primary"
            onClick={restoreQuestion}
            disabled={selectIds.length === 0 || restoreLoad}
          >
            恢复
          </Button>
          <Button danger onClick={deleteQuestion} disabled={selectIds.length === 0}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={list}
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
          {loading && (
            <div style={{ textAlign: 'center' }}>
              <Spin />
            </div>
          )}
          {!loading && list.length === 0 && <Empty description="暂无数据" />}
          {!loading && list.length > 0 && TableItem}
        </div>
        <div className={styles.footer}>
          <PageList total={total} />
        </div>
      </div>
    </>
  )
}

export default Trash
