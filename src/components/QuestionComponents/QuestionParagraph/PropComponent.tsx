import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox } from 'antd'
import { QuestionParagraphInterface } from './type'
const PropComponent: FC<QuestionParagraphInterface> = (props: QuestionParagraphInterface) => {
  const { text, isCenter, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input
  useEffect(() => {
    form.setFieldsValue({
      text,
      isCenter,
    })
  }, [text, isCenter])
  const handleValsChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleValsChange}
      initialValues={{ text, isCenter }}
      form={form}
      disabled={disabled}
    >
      <Form.Item
        label="段落内容"
        name="text"
        rules={[{ required: true, message: '请输入段落内容' }]}
      >
        <TextArea />
      </Form.Item>
      <Form.Item valuePropName="checked" name="isCenter">
        <Checkbox>居中显示</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
