import React, { FC, useEffect } from 'react'
import { Form, Input } from 'antd'
import { QuestionInputInterface } from './type'
const PropComponent: FC<QuestionInputInterface> = (props: QuestionInputInterface) => {
  const { title, placeholder, onChange, disabled } = props
  const [form] = Form.useForm()
  useEffect(() => {
    form.setFieldsValue({
      title,
      placeholder,
    })
  }, [title, placeholder])
  const handleValsChange = () => {
    if (onChange) {
      onChange(form.getFieldsValue())
    }
  }
  return (
    <Form
      layout="vertical"
      initialValues={{ title, placeholder }}
      form={form}
      onChange={handleValsChange}
      disabled={disabled}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Placeholder" name="placeholder">
        <Input />
      </Form.Item>
    </Form>
  )
}

export default PropComponent
