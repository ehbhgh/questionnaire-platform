import React, { FC } from 'react'
import { Typography, Radio, Space } from 'antd'
import { QuestionRadioInterface, OptionType } from './type'
import { QuestionRadioPropDefault } from './default'
const { Paragraph } = Typography
const QuestionRadio: FC<QuestionRadioInterface> = (props: QuestionRadioInterface) => {
  const { title, isVertical, options, value } = { ...QuestionRadioPropDefault, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>
      <Radio.Group value={value}>
        <Space direction={isVertical ? 'vertical' : 'horizontal'}>
          {options?.map((item: OptionType) => {
            const { value, text } = item
            return (
              <Radio key={value} value={value}>
                {text}
              </Radio>
            )
          })}
        </Space>
      </Radio.Group>
    </div>
  )
}

export default QuestionRadio
