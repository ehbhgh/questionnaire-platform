import React, { FC } from 'react'
import { Button, Space, Form, Input } from 'antd'
import type { FormProps } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { RouterPath } from '@/constant'
import styles from './Regiest.module.scss'
import type { RegiestFieldInterface } from '@/types/regiest'
import { registerService } from '@/apis/user'
import { useRequest } from 'ahooks'

const Register: FC = () => {
  const nav = useNavigate()
  const onFinish: FormProps<RegiestFieldInterface>['onFinish'] = values => {
    run(values)
  }

  const onFinishFailed: FormProps<RegiestFieldInterface>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }

  const { loading, run } = useRequest(
    async values => {
      const { password, nickname, username } = values
      const res = await registerService(password, nickname, username)
      return res
    },
    {
      manual: true,
      onSuccess: () => {
        nav(RouterPath.LOGON_PATHNAME)
      },
    }
  )
  const FormElement = (
    <Form
      name="FormElement"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 13 }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<RegiestFieldInterface>
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
      <Form.Item<RegiestFieldInterface> label="昵称" name="nickname">
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
        dependencies={['password']} //依赖password
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              } else {
                return Promise.reject(new Error('两次密码不一致'))
              }
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
        <Space>
          <Button type="primary" className={styles.btn} htmlType="submit" disabled={loading}>
            注册
          </Button>
        </Space>
      </Form.Item>
    </Form>
  )
  return (
    <div className={styles.container}>
      <div className={styles.imgBg}>
        <img src={require('@/assets/images/loginBg.png')} alt="" />
      </div>
      <div className={styles.login}>
        <div className={styles.header}>
          <div className={styles.title}>
            <img src={require('@/assets/images/logo.png')} alt="" className={styles.logo} />
            问卷调查平台
          </div>
          <div className={styles.titleOl}>请注册后登录!</div>
        </div>
        <div className={styles.form_area}>
          {FormElement}
          <Link to={RouterPath.LOGON_PATHNAME} className={styles.register_user}>
            已有账户，登录
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register
