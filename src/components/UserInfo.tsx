import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import { RouterPath } from '@/constant'
const UserInfo: FC = () => {
  return (
    <>
      <Link to={RouterPath.LOGON_PATHNAME}>登录</Link>
    </>
  )
}

export default UserInfo
