import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionTitleInterface } from './type'
import { QuestionTitleDefaultProp, fontSizeMap } from './default'
const { Title } = Typography
const QuestionTitle: FC<QuestionTitleInterface> = (props: QuestionTitleInterface) => {
  const { text = '', level = 1, isCenter = false } = { ...QuestionTitleDefaultProp, ...props }

  return (
    <Title
      level={level}
      style={{
        textAlign: isCenter ? 'center' : 'start',
        marginBottom: '0',
        fontSize: fontSizeMap[level],
      }}
    >
      {text}
    </Title>
  )
}

export default QuestionTitle
