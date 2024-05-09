import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import type { FormProps } from 'antd'
import { LoginFieldInterface } from '@/types/login'
import { UserAddOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { RouterPath } from '@/constant'
import { remeberUser, deleteUser, getUser } from './remeberUser'
import { Button, Space, Checkbox, Form, Input, Typography } from 'antd'
const { Title } = Typography
const Login: FC = () => {
  const [form] = Form.useForm()

  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldsValue({
      username,
      password,
    })
  }, [])
  const onFinish: FormProps<LoginFieldInterface>['onFinish'] = values => {
    const { username, password, remeber } = values || {}
    if (remeber) {
      remeberUser(username, password)
    } else {
      deleteUser()
    }
  }

  const onFinishFailed: FormProps<LoginFieldInterface>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>用户登录</Title>
        </Space>
      </div>
      <div className={styles.form_area}>
        <Form
          name="FormElement"
          labelCol={{ span: 6 }}
          initialValues={{ remeber: true }}
          wrapperCol={{ span: 20 }}
          onFinish={onFinish}
          form={form}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<LoginFieldInterface>
            label="用户名"
            name="username"
            rules={[
              { required: true, message: '请输入用户名' },
              {
                type: 'string',
                min: 5,
                max: 20,
                message: '字符长度在5-20之间',
              },
              {
                pattern: /^\w+$/,
                message: '只能是字母数字下划线',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<LoginFieldInterface>
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item<LoginFieldInterface> name="remeber" valuePropName="checked">
            <Checkbox>记住我</Checkbox>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Space>
              <Button type="primary" htmlType="submit">
                登录
              </Button>
              <Link to={RouterPath.REGISTER_PATHNAME}>注册新用户</Link>
            </Space>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default Login
