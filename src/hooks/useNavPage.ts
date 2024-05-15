import useGetUserInfo from './useGetUserInfo'
import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { RouterPath } from '@/constant'
import { isLoginOrRegister } from '@/utils/routeJudgment'
const useNavPage = (waitingUserData: boolean) => {
  const { userName } = useGetUserInfo()
  const { pathname } = useLocation()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) return
    //判断是否是登录页，注册页
    const isLoginTrue = isLoginOrRegister(pathname, [
      RouterPath.REGISTER_PATHNAME,
      RouterPath.LOGON_PATHNAME,
    ])
    //判断是否是登录页，注册页，首页
    const isUserInfoTrue = isLoginOrRegister(pathname, [
      RouterPath.REGISTER_PATHNAME,
      RouterPath.LOGON_PATHNAME,
      RouterPath.HOME_PATHNAME,
    ])
    //已经登录
    if (userName) {
      //是用户登录页
      if (isLoginTrue) {
        nav(RouterPath.MANAGE_INDEX_PATHNAME)
      }
      return
    }
    // 未登录
    //是用户登录注册首页，不用处理
    if (isUserInfoTrue) {
      return
    }
    //否则需要跳转到登录页面
    else {
      nav(RouterPath.LOGON_PATHNAME)
    }
  }, [waitingUserData, userName, pathname])
}

export default useNavPage
