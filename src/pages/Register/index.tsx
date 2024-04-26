import React, { FC } from 'react'
import { Button, Space, Form, Input, Typography } from 'antd'
import { UserAddOutlined } from '@ant-design/icons'
import type { FormProps } from 'antd'
import { Link } from 'react-router-dom'
import { RouterPath } from '@/constant'
import styles from './Regiest.module.scss'
import { RegiestFieldInterface } from '@/types/regiest'
const { Title } = Typography

const onFinish: FormProps<RegiestFieldInterface>['onFinish'] = values => {
  console.log('Success:', values)
}

const onFinishFailed: FormProps<RegiestFieldInterface>['onFinishFailed'] = errorInfo => {
  console.log('Failed:', errorInfo)
}
const FormElement = (
  <Form
    name="FormElement"
    labelCol={{ span: 6 }}
    wrapperCol={{ span: 20 }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <Form.Item<RegiestFieldInterface>
      label="用户名"
      name="username"
      rules={[{ required: true, message: '请输入用户名' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<RegiestFieldInterface>
      label="昵称"
      name="nickname"
      rules={[{ required: true, message: '请输入昵称' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<RegiestFieldInterface>
      label="密码"
      name="password"
      rules={[{ required: true, message: '请输入密码' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item<RegiestFieldInterface>
      label="确认密码"
      name="confirm_password"
      rules={[{ required: true, message: '请确认密码' }]}
    >
      <Input.Password />
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 6, span: 20 }}>
      <Space>
        <Button type="primary" htmlType="submit">
          注册
        </Button>
        <Link to={RouterPath.LOGON_PATHNAME}>已有账户，登录</Link>
      </Space>
    </Form.Item>
  </Form>
)
const Register: FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Space>
          <Title level={2}>
            <UserAddOutlined />
          </Title>
          <Title level={2}>注册新用户</Title>
        </Space>
      </div>
      <div className={styles.form_area}>{FormElement}</div>
    </div>
  )
}

export default Register