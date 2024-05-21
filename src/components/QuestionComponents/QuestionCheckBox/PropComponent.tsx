import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionCheckBoxInterface, OptionType } from './type'
import { QuestionCheckBoxPropDefault } from './default'
import { nanoid } from 'nanoid'
const PropComponent: FC<QuestionCheckBoxInterface> = (props: QuestionCheckBoxInterface) => {
  const { title, isVertical, list, onChange, disabled } = {
    ...QuestionCheckBoxPropDefault,
    ...props,
  }
  const [form] = Form.useForm()
  const handleValsChange = () => {
    const newVal = form.getFieldsValue() as QuestionCheckBoxInterface
    if (newVal.list) {
      newVal.list = newVal.list.filter(opt => !(opt.text === null))
    }

    const { list = [] } = newVal
    list.forEach(item => {
      if (item.value) return
      item.value = `item${nanoid(5)}`
    })

    onChange && onChange(newVal)
  }
  useEffect(() => {
    form.setFieldsValue({
      title,
      isVertical,
      list,
    })
  }, [title, isVertical, list])
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, list }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValsChange}
    >
      <Form.Item
        label="标题"
        name="title"
        rules={[{ required: true, message: '请输入复选框标题' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="list">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item name={[name, 'checked']} valuePropName="checked">
                      <Checkbox />
                    </Form.Item>
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: async (rule, value) => {
                            const { list = [] } = form.getFieldsValue()
                            let num = 0
                            list.forEach((t: OptionType) => {
                              if (t.text === value) {
                                num++
                              }
                            })
                            if (num === 1) return Promise.resolve()
                            return Promise.reject(new Error('与其他选项重复了'))
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入选项文字" />
                    </Form.Item>
                    {/* 删除按钮 */}
                    {index > 1 && <MinusCircleOutlined onClick={() => remove(name)} />}
                  </Space>
                )
              })}

              {
                // 新增选项
                <Form.Item>
                  <Button
                    type="link"
                    icon={<PlusOutlined />}
                    onClick={() => add({ text: '', value: '', checked: false })}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              }
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
