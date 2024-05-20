import React, { FC } from 'react'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentsProps from './ComponentsProps'
const RightPanel: FC = () => {
  const tabItems = [
    {
      key: 'property',
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentsProps />,
    },
    {
      key: 'setting',
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ]
  return <Tabs defaultActiveKey="property" items={tabItems} />
}

export default RightPanel
