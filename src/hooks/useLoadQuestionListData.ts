import { useRequest } from 'ahooks'
import { getQuestionListService } from '@/apis/qusetion'
import { useSearchParams } from 'react-router-dom'
import { ListSearchConstant } from '@/constant'
import { ExtendOptionInterface } from '@/types/list'
const useLoadQuestionListData = (opt: ExtendOptionInterface = {}) => {
  const [searchParams] = useSearchParams()
  const { isDeleted = false, isStar = false } = opt
  const {
    data = {},
    loading,
    error,
  } = useRequest(
    async () => {
      const keyword = searchParams.get(ListSearchConstant.LIST_SEARCH_PARAM_KEY) || ''
      const page = Number(searchParams.get(ListSearchConstant.LIST_PAGE_PARAM_VALUE)) || 1
      const pageSize = Number(searchParams.get(ListSearchConstant.LIST_PAGESIZE_PARAM_VALUE)) || 10
      const data = await getQuestionListService({ keyword, isDeleted, isStar, page, pageSize })
      return data
    },
    {
      refreshDeps: [searchParams], //刷新依赖项
    }
  )
  return { data, loading, error }
}
export default useLoadQuestionListData
