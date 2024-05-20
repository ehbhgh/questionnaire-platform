import request from '@/services/request'
import type { ResDataInterface } from '@/types/request'
import type { SearchOptionInterface } from '@/types/list'

//获取单个问卷信息
export const getQuestionService = async (id: string): Promise<ResDataInterface> => {
  const url = `/api/question/${id}`
  const data = (await request.get(url)) as ResDataInterface
  return data
}

//创建问卷
export const createQuestionService = async (): Promise<ResDataInterface> => {
  const url = `/api/question`
  const data = (await request.post(url)) as ResDataInterface
  return data
}

//获取查询问卷列表
export const getQuestionListService = async (
  opt: Partial<SearchOptionInterface>
): Promise<ResDataInterface> => {
  const url = `/api/question`
  const data = (await request.get(url, {
    params: opt,
  })) as ResDataInterface
  return data
}

//更新问卷列表
export const updateQuestionService = async (
  id: string,
  data: {
    [key: string]: unknown
  }
): Promise<ResDataInterface> => {
  const url = `/api/question/${id}`
  const res = (await request.patch(url, data)) as ResDataInterface
  return res
}

//复制问卷
export const duplicateQuestionService = async (id: string): Promise<ResDataInterface> => {
  const url = `/api/question/duplicate/${id}`
  const data = (await request.post(url)) as ResDataInterface
  return data
}

//删除问卷
export const deleteQuestionService = async (ids: string[]) => {
  const url = `/api/question`
  const data = (await request.delete(url, { data: ids })) as ResDataInterface
  return data
}
