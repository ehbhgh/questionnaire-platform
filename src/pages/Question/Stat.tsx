import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'

const Stat: FC = () => {
  const { loading, data } = useLoadQuestionData()
  return (
    <div>
      <h1>星标详情页面</h1>
      {loading ? <p>loading...</p> : <p>{JSON.stringify(data)}</p>}
    </div>
  )
}

export default Stat
