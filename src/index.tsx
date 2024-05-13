import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/style/index.scss'
import zh_CN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <ConfigProvider locale={zh_CN}>
    <App />
  </ConfigProvider>
)
