import React, { FC } from 'react'
import { Input, Typography } from 'antd'
import { QuestionTextAreaInterface } from './type'
import { QuestionTextAreaDefaultProp } from './default'
const { Paragraph } = Typography
const { TextArea } = Input
const QuestionTextArea: FC<QuestionTextAreaInterface> = (props: QuestionTextAreaInterface) => {
  const { title = '', placeholder = '' } = { ...QuestionTextAreaDefaultProp, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <div>
        <TextArea placeholder={placeholder} />
      </div>
    </div>
  )
}

export default QuestionTextArea
