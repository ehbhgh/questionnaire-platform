import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginReducer } from '@/store/features/user'
import { useRequest } from 'ahooks'
import { getUserInfoService } from '@/apis/user'
import useGetUserInfo from './useGetUserInfo'
import { RouterPath } from '@/constant'
import { isLoginOrRegister } from '@/utils/routeJudgment'
import { useLocation } from 'react-router-dom'

const useLoadUserInfoData = () => {
  const [watingUserState, setwatingUserState] = useState<boolean>(true)
  const { userName } = useGetUserInfo()
  const dispatch = useDispatch()
  const { pathname } = useLocation()
  const isLoginTrue = isLoginOrRegister(pathname, [
    RouterPath.REGISTER_PATHNAME,
    RouterPath.LOGON_PATHNAME,
  ])
  const { run: getUserInfo } = useRequest(getUserInfoService, {
    manual: true,
    onSuccess(data) {
      const { userName, nickname, url } = data
      dispatch(loginReducer({ userName, nickname, url }))
    },
    onFinally() {
      setwatingUserState(false)
    },
  })
  useEffect(() => {
    if (userName) {
      setwatingUserState(false)
      return
    }
    if (isLoginTrue) return
    getUserInfo()
  }, [userName, pathname])

  return {
    watingUserState,
  }
}
export default useLoadUserInfoData
