import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionInputInterface } from './type'
import { QuestionInputDefaultProp } from './default'
const { Paragraph } = Typography
const QuestionInput: FC<QuestionInputInterface> = (props: QuestionInputInterface) => {
  const { title = '', placeholder = '' } = { ...QuestionInputDefaultProp, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <Input placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionInput
