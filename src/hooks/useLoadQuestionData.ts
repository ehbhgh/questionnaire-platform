import { useParams } from 'react-router-dom'
import { getQuestionService } from '@/apis/qusetion'
import { useRequest } from 'ahooks'
const useLoadQuestionData = () => {
  const { id = '' } = useParams()

  async function load() {
    const res = await getQuestionService(id)
    return res
  }
  const { loading, data, error } = useRequest(load)
  return { loading, data, error }
}

export default useLoadQuestionData
