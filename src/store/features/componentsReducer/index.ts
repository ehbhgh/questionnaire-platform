import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ComponentStateType, ComponentInfoInterface } from '@/types/components'
import { ComponentPropsType } from '@/components/QuestionComponents'
import { getNextSelectedId } from './utils'
import { produce } from 'immer'
const INIT_STATE: ComponentStateType = {
  //组件列表
  componentList: [],
  //当前选中组件的uuid
  selectledId: '',
}
const componentsSlice = createSlice({
  name: 'componentsReducer',
  initialState: INIT_STATE,
  //相当于reducer
  reducers: {
    //重置所有组件
    resetComponents: (state: ComponentStateType, action: PayloadAction<ComponentStateType>) => {
      return action.payload
    },
    //修改selectId
    changeSelectId: produce((draft: ComponentStateType, action: PayloadAction<string>) => {
      draft.selectledId = action.payload
    }),
    //添加新组件
    addNewComponent: produce(
      (draft: ComponentStateType, action: PayloadAction<ComponentInfoInterface>) => {
        const newComponent = action.payload
        const { componentList, selectledId } = draft
        //知道当前selectId;
        const targetIndex = componentList.findIndex(item => item.uuid === selectledId)
        //如果当前selectId为空，则直接添加,未选中组件
        if (targetIndex === -1) {
          draft.componentList.push(newComponent)
        } else {
          draft.componentList.splice(targetIndex + 1, 0, newComponent)
        }
      }
    ),
    //修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{ uuid: string; newProps: ComponentPropsType }>
      ) => {
        const { uuid, newProps } = action.payload
        //找到组件
        const targeComponent = draft.componentList.find(item => item.uuid === uuid)
        if (targeComponent) {
          targeComponent.props = {
            ...targeComponent.props,
            ...newProps,
          }
        }
      }
    ),

    //删除组件
    deleteSelectComponent: produce((draft: ComponentStateType) => {
      const { componentList, selectledId } = draft

      //重新计算selectId
      const newSelectedId = getNextSelectedId(selectledId, componentList)
      draft.selectledId = newSelectedId
      const targetIndex = componentList.findIndex(item => item.uuid === selectledId)
      if (targetIndex !== -1) {
        componentList.splice(targetIndex, 1)
      }
    }),

    //隐藏/显示组件
    changeComponentsHidden: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          uuid: string
          isHidden: boolean
        }>
      ) => {
        const { componentList = [] } = draft
        const { uuid, isHidden } = action.payload
        //重新计算selectId
        let newSelectedId = ''
        if (isHidden) {
          newSelectedId = getNextSelectedId(uuid, componentList)
        } else {
          //要显示
          newSelectedId = uuid
        }
        draft.selectledId = newSelectedId
        const curComp = componentList.find(item => item.uuid === uuid)
        if (curComp) {
          curComp.isHidden = isHidden
        }
      }
    ),

    //锁定/解锁组件
    toggleComponentLock: produce(
      (
        draft: ComponentStateType,
        action: PayloadAction<{
          uuid: string
        }>
      ) => {
        const { uuid } = action.payload
        const curComp = draft.componentList.find(item => item.uuid === uuid)
        if (curComp) {
          curComp.isLocked = !curComp.isLocked
        }
      }
    ),
  },
})

//导出action，在组件中用
export const {
  resetComponents,
  changeSelectId,
  addNewComponent,
  changeComponentProps,
  deleteSelectComponent,
  changeComponentsHidden,
  toggleComponentLock,
} = componentsSlice.actions
export default componentsSlice.reducer
