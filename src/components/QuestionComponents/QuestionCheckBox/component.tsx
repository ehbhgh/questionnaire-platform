import React, { FC } from 'react'
import { Typography, Checkbox, Space } from 'antd'
import { QuestionCheckBoxInterface, OptionType } from './type'
import { QuestionCheckBoxPropDefault } from './default'
const { Paragraph } = Typography
const QuestionCheckBox: FC<QuestionCheckBoxInterface> = (props: QuestionCheckBoxInterface) => {
  const { title, isVertical, list } = { ...QuestionCheckBoxPropDefault, ...props }
  return (
    <div>
      <Paragraph strong>{title}</Paragraph>

      <Space direction={isVertical ? 'vertical' : 'horizontal'}>
        {list?.map((item: OptionType) => {
          const { value, text, checked } = item
          return (
            <Checkbox key={value} value={value} checked={checked}>
              {text}
            </Checkbox>
          )
        })}
      </Space>
    </div>
  )
}

export default QuestionCheckBox
