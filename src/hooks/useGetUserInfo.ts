import { useSelector } from 'react-redux'
import type { UserReducerItemInterface, UserInterface } from '@/types/user'
const useGetUserInfo = () => {
  const { userName, nickname, url } = useSelector<UserReducerItemInterface>(state => {
    return state.user.user
  }) as UserInterface

  return { userName, nickname, url }
}
export default useGetUserInfo
