import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInfoInterface } from './type'

const PropComponent: FC<QuestionInfoInterface> = (props: QuestionInfoInterface) => {
  const { title, desc, onChange, disabled } = props
  const [form] = Form.useForm()
  const { TextArea } = Input
  useEffect(() => {
    form.setFieldsValue({
      title,
      desc,
    })
  }, [title, desc])
  const handleValsChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      onValuesChange={handleValsChange}
      initialValues={{ title, desc }}
      form={form}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="描述" name="desc" rules={[{ required: true, message: '请输入描述' }]}>
        <TextArea />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
