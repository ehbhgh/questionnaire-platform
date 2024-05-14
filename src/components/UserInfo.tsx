import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/apis/user'
import type { MenuProps } from 'antd'
import { Dropdown, message, Space, Avatar } from 'antd'
import { LocalstorageKey, RouterPath } from '@/constant'
import LocalStorageManager from '@/utils/localStorageManager'
import { useNavigate } from 'react-router-dom'
const UserInfo: FC = () => {
  const { data } = useRequest(getUserInfoService)
  const token = new LocalStorageManager(LocalstorageKey.LOGIN_TOKEN_KEY)
  const { nickname, url, userName } = data || {}
  const nav = useNavigate()
  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === '1') {
      message.success('退出成功')
      token.clear()
      nav(RouterPath.LOGON_PATHNAME)
    }
  }
  const items: MenuProps['items'] = [
    {
      label: <span>退出登录</span>,
      key: '1',
    },
  ]
  const UserInfoEle = (
    <>
      <Dropdown menu={{ items, onClick }}>
        <a onClick={e => e.preventDefault()}>
          <Space>
            <Avatar size="small" src={url} />
            <span style={{ color: '#fff' }}> {nickname}</span>
          </Space>
        </a>
      </Dropdown>
    </>
  )
  const login = (
    <>
      <Space>
        <Avatar size="small" icon={<UserOutlined />} />
        <Link to={RouterPath.LOGON_PATHNAME} style={{ color: '#fff' }}>
          登录
        </Link>
      </Space>
    </>
  )

  return <>{userName ? UserInfoEle : login}</>
}

export default UserInfo
