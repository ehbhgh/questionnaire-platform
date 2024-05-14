import React, { FC, useEffect } from 'react'
import styles from './Login.module.scss'
import type { FormProps } from 'antd'
import { LoginFieldInterface } from '@/types/login'
import { Link } from 'react-router-dom'
import { RouterPath, LocalstorageKey } from '@/constant'
import { loginService } from '@/apis/user'
import { useRequest } from 'ahooks'
import { useNavigate } from 'react-router-dom'
import LocalStorageManager from '@/utils/localStorageManager'
import { remeberUser, deleteUser, getUser } from './remeberUser'
import { Button, Space, Checkbox, Form, Input } from 'antd'
const Login: FC = () => {
  const [form] = Form.useForm()
  const nav = useNavigate()
  const storageManager = new LocalStorageManager(LocalstorageKey.LOGIN_TOKEN_KEY)
  useEffect(() => {
    const { username, password } = getUser()
    form.setFieldsValue({
      username,
      password,
    })
  }, [])
  const { run: login } = useRequest(
    async (username: string, password: string) => {
      const res = await loginService(username, password)
      return res
    },
    {
      manual: true,
      onSuccess: res => {
        const { token } = res
        storageManager.save(token)
        nav(RouterPath.HOME_PATHNAME)
      },
    }
  )
  const onFinish: FormProps<LoginFieldInterface>['onFinish'] = values => {
    const { username, password, remeber } = values || {}
    if (remeber) {
      remeberUser(username, password)
    } else {
      deleteUser()
    }
    login(username, password)
  }

  const onFinishFailed: FormProps<LoginFieldInterface>['onFinishFailed'] = errorInfo => {
    console.log('Failed:', errorInfo)
  }
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
          <div className={styles.titleOl}>Welcome欢迎登录!</div>
        </div>
        <div className={styles.form_area}>
          <Form
            name="FormElement"
            labelCol={{ span: 4 }}
            initialValues={{ remeber: true }}
            wrapperCol={{ span: 13 }}
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
              <Input className={styles.antd_input} />
            </Form.Item>

            <Form.Item<LoginFieldInterface>
              label="密码"
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password className={styles.antd_input} />
            </Form.Item>
            <Form.Item<LoginFieldInterface>
              wrapperCol={{ offset: 2, span: 20 }}
              name="remeber"
              valuePropName="checked"
            >
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 2, span: 20 }}>
              <Space>
                <Button type="primary" htmlType="submit" className={styles.btn}>
                  登录
                </Button>
              </Space>
            </Form.Item>
          </Form>
          <Link to={RouterPath.REGISTER_PATHNAME} className={styles.register_user}>
            注册新用户
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Login
