import React, { FC } from 'react'
import { Typography } from 'antd'
import { QuestionInfoInterface } from './type'
import { QuestionInFoDefaultProp } from './default'
const { Title } = Typography
import WrapParagraph from '@/components/WrapParagraph'
const QuestionInfo: FC<QuestionInfoInterface> = (props: QuestionInfoInterface) => {
  const { title = '', desc = '' } = { ...QuestionInFoDefaultProp, ...props }

  return (
    <div style={{ textAlign: 'center' }}>
      <Title
        style={{
          textAlign: 'center',
          marginBottom: '0',
          fontSize: '24px',
        }}
      >
        {title}
      </Title>
      <WrapParagraph {...{ text: desc, isCenter: true }} />
    </div>
  )
}

export default QuestionInfo
