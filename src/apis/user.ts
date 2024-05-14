import request from '@/services/request'
import type { ResDataInterface } from '@/types/request'

//获取用户信息
export const getUserInfoService = async (): Promise<ResDataInterface> => {
  const url = `/api/user/info`
  const data = (await request.get(url)) as ResDataInterface
  return data
}

//注册
export const registerService = async (
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataInterface> => {
  const url = `/api/user/register`
  const data = (await request.post(url, {
    username,
    password,
    nickname: nickname || username,
  })) as ResDataInterface
  return data
}

//登录
export const loginService = async (
  username: string,
  password: string
): Promise<ResDataInterface> => {
  const url = `/api/user/login`
  const data = (await request.post(url, {
    username,
    password,
  })) as ResDataInterface
  return data
}
