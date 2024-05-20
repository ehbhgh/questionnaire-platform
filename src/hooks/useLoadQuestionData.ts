import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/apis/qusetion'
import { useRequest } from 'ahooks'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetComponents } from '@/store/features/componentsReducer'
const useLoadQuestionData = () => {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const {
    data,
    run: load,
    loading,
  } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷id')
      const res = await getQuestionService(id)
      return res
    },
    {
      manual: true,
    }
  )

  //设置redux
  useEffect(() => {
    if (!data) return
    const { componentList } = data
    //默认选中第一个组件
    let selectledId = ''
    if (componentList.length > 0) {
      selectledId = componentList[0].uuid
    }

    dispatch(resetComponents({ componentList, selectledId }))
  }, [data])

  //加载数据
  useEffect(() => {
    load(id)
  }, [id])

  return { loading }
}

export default useLoadQuestionData
