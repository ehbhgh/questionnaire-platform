import { configureStore } from '@reduxjs/toolkit'
import userReducer from './features/user'
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  devTools: process.env.NODE_ENV !== 'production', // 仅在开发环境中启用devTools
})
export default store
