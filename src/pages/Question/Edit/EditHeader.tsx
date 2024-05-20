import React, { FC } from 'react'
import { Button, Typography, Space } from 'antd'
import { LeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import styles from '../css/edit-header.module.scss'
import EditToolbar from './EditToolbar'
const EditHeader: FC = () => {
  const nav = useNavigate()
  const { Title } = Typography
  return (
    <div className={styles['heder-wraper']}>
      <div className={styles.header}>
        <div className={styles.left}>
          <Space>
            <Button type="link" icon={<LeftOutlined />} onClick={() => nav(-1)}>
              返回
            </Button>
            <Title level={2}>问卷标题</Title>
          </Space>
        </div>
        <div className={styles.main}>
          <EditToolbar />
        </div>
        <div className={styles.right}>
          <Space>
            <Button type="link">保存</Button>
            <Button type="primary">发布</Button>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default EditHeader
