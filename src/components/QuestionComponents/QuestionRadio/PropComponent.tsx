import React, { FC, useEffect } from 'react'
import { Form, Input, Checkbox, Select, Button, Space } from 'antd'
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons'
import { QuestionRadioInterface, OptionType } from './type'
import { QuestionRadioPropDefault } from './default'
import { nanoid } from 'nanoid'
const PropComponent: FC<QuestionRadioInterface> = (props: QuestionRadioInterface) => {
  const { title, isVertical, value, options, onChange, disabled } = {
    ...QuestionRadioPropDefault,
    ...props,
  }

  const [form] = Form.useForm()
  const handleValsChange = () => {
    console.log('ff')

    if (!onChange) return
    const newVal = form.getFieldsValue() as QuestionRadioInterface
    if (newVal.options) {
      newVal.options = newVal.options.filter(opt => !(opt.text === null))
    }
    const { options = [] } = newVal
    options.forEach(item => {
      if (item.value) return
      item.value = `item${nanoid(5)}`
    })
    onChange(newVal)
  }
  useEffect(() => {
    console.log(value, 'value')

    form.setFieldsValue({
      title,
      isVertical,
      value,
      options,
    })
  }, [title, isVertical, value, options])
  return (
    <Form
      layout="vertical"
      initialValues={{ title, isVertical, value, options }}
      form={form}
      disabled={disabled}
      onValuesChange={handleValsChange}
    >
      <Form.Item label="标题" name="title" rules={[{ required: true, message: '请输入标题' }]}>
        <Input />
      </Form.Item>
      <Form.Item label="选项">
        <Form.List name="options">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name }, index) => {
                return (
                  <Space key={key} align="baseline">
                    <Form.Item
                      name={[name, 'text']}
                      rules={[
                        { required: true, message: '请输入选项文字' },
                        {
                          validator: async (_rule, value) => {
                            const { options = [] } = form.getFieldsValue()
                            let num = 0
                            options.forEach((t: OptionType) => {
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
                    onClick={() => add({ text: '', value: '' })}
                  >
                    添加选项
                  </Button>
                </Form.Item>
              }
            </>
          )}
        </Form.List>
      </Form.Item>
      <Form.Item label="默认选中" name="value">
        <Select
          options={options?.map((t: OptionType) => ({ value: t.value, label: t.text }))}
        ></Select>
      </Form.Item>
      <Form.Item valuePropName="checked" name="isVertical">
        <Checkbox>竖向排列</Checkbox>
      </Form.Item>
    </Form>
  )
}

export default PropComponent
