import React, { FC } from 'react'
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons'
import { Tabs } from 'antd'
import ComponentsLib from './ComponentsLib'
const LeftPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: (
        <span>
          <AppstoreOutlined />
          组件库
        </span>
      ),
      children: <ComponentsLib />,
    },
    {
      key: 'layers',
      label: (
        <span>
          <BarsOutlined />
          图层
        </span>
      ),
      children: <div>图层</div>,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabItems} />
}

export default LeftPanel
