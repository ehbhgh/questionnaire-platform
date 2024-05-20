import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
import componentReducer from './features/componentsReducer'
const store = configureStore({
  reducer: {
    user: userReducer,
    //组件列表信息
    component: componentReducer,
    // 组件详情信息
    // componentDetail: componentDetailReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // 仅在开发环境中启用devTools
})
export default store
