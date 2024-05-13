import React, { FC, memo, useState } from 'react'
import styles from './css/questionCard.module.scss'
import { useRequest } from 'ahooks'
import { Button, Space, Divider, Tag, Typography, Popconfirm, Modal, message } from 'antd'
import { QuestionCardProps } from './types'
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  StarTwoTone,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
} from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { updateQuestionService, duplicateQuestionService } from '@/apis/qusetion'
const { confirm } = Modal
const { Title } = Typography
const QuestionCard: FC<QuestionCardProps> = memo(props => {
  const { _id, title, isPublished, isStar, answerCount, createAt } = props
  const [isStarState, setIsStarState] = useState(isStar)
  const [isDeleted, setIsDeleted] = useState(false)
  const navigate = useNavigate()
  //复制问卷
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      const res = await duplicateQuestionService(_id)
      return res
    },
    {
      manual: true,
      onSuccess: res => {
        message.success('复制成功')
        navigate(`/question/edit/${res.id}`)
      },
    }
  )
  //修改标星
  const { loading: changeStarLoad, run: changeStar } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isStar: !isStarState })
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        setIsStarState(!isStarState)
      },
    }
  )

  //删除
  const { loading: deleteLoad, run: del } = useRequest(
    async () => {
      const res = await updateQuestionService(_id, { isDeleted: true })
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        setIsDeleted(true)
      },
    }
  )
  const deleteQuestion = () => {
    confirm({
      title: '确定删除该问卷？',
      icon: <ExclamationCircleFilled />,
      onOk: () => {
        del()
      },
    })
  }
  if (isDeleted) return null
  return (
    <div className={styles.listItem}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}>
            <Space>
              {isStarState && <StarOutlined style={{ color: 'red' }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? <Tag color="green">已发布</Tag> : <Tag color="red">未发布</Tag>}
            <Title level={5}>答卷:{answerCount}</Title>
            <Title level={5}>{createAt}</Title>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: '12px' }} />
      <div className={styles.btn_container}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => navigate(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            {isStarState ? (
              <Button
                type="text"
                icon={<StarTwoTone />}
                size="small"
                style={{ color: '#1677FF' }}
                disabled={changeStarLoad}
                onClick={changeStar}
              >
                取消标星
              </Button>
            ) : (
              <Button
                type="text"
                icon={<StarOutlined />}
                size="small"
                disabled={changeStarLoad}
                onClick={changeStar}
              >
                标星
              </Button>
            )}
            <Popconfirm
              title="确定复制该问卷？"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button type="text" icon={<CopyOutlined />} size="small" disabled={duplicateLoading}>
                复制
              </Button>
            </Popconfirm>

            <Button
              type="text"
              icon={<DeleteOutlined />}
              disabled={deleteLoad}
              size="small"
              onClick={deleteQuestion}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  )
})

export default QuestionCard
