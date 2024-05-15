import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { UserReducerInterface, UserInterface } from '@/types/user'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      userName: '',
      nickname: '',
      url: '',
    },
  },
  //相当于reducer
  reducers: {
    //相当与case语句，修改state
    loginReducer: (state: UserReducerInterface, action: PayloadAction<UserInterface>) => {
      const { userName, nickname, url } = action.payload
      if (!userName || !nickname || !url) {
        return
      }
      state.user.userName = userName
      state.user.nickname = nickname
      state.user.url = url
    },

    logOutReducer: (state: UserReducerInterface) => {
      state.user.userName = ''
      state.user.nickname = ''
      state.user.url = ''
    },
  },
})

//导出action，在组件中用
export const { loginReducer, logOutReducer } = userSlice.actions
export default userSlice.reducer
