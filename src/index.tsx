import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import '@/style/index.scss'
import zh_CN from 'antd/lib/locale/zh_CN'
import { ConfigProvider } from 'antd'
import 'dayjs/locale/zh-cn'
import { Provider } from 'react-redux'
import store from './store'
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <ConfigProvider locale={zh_CN}>
      <App />
    </ConfigProvider>
  </Provider>
)
