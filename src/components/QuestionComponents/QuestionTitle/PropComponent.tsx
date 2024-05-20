import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select } from 'antd'
import { QuestionTitleInterface } from './type'
const PropComponent: FC<QuestionTitleInterface> = (props: QuestionTitleInterface) => {
  const { text, level, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      text,
      level,
      isCenter,
    })
  }, [text, level, isCenter])
  const handleValsChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleValsChange}
      initialValues={{ text, level, isCenter }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="标题内容"
        name="text"
        rules={[{ required: true, message: '请输入标题内容' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="层级" name="level">
        <Select
          options={[
            {
              value: 1,
              text: '一级标题',
            },
            {
              value: 2,
              text: '二级标题',
            },
            {
              value: 3,
              text: '三级标题',
            },
            {
              value: 4,
              text: '四级标题',
            },
            {
              value: 5,
              text: '五级标题',
            },
          ]}
        ></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
