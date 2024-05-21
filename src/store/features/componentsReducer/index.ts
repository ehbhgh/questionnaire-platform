import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { ComponentStateType, ComponentInfoInterface } from '@/types/components'
import { ComponentPropsType } from '@/components/QuestionComponents'
import { getNextSelectedId, insertNewComponent } from './utils'
import { produce } from 'immer'
import * as _ from 'lodash'
import { nanoid } from 'nanoid'
const INIT_STATE: ComponentStateType = {
  //组件列表
  componentList: [],
  //当前选中组件的uuid
  selectledId: '',
  //复制组件
  copiedComponent: null,
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
        insertNewComponent(draft, newComponent)
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

    //复制当前选中组件
    copySelectComponent: produce((draft: ComponentStateType) => {
      const { componentList, selectledId } = draft
      const targetComponent = componentList.find(item => item.uuid === selectledId)
      if (targetComponent) {
        draft.copiedComponent = _.cloneDeep(targetComponent)
      }
    }),

    //粘贴当前组件
    pasteSelectComponent: produce((draft: ComponentStateType) => {
      const { copiedComponent } = draft
      if (!copiedComponent) {
        return
      }
      copiedComponent.uuid = nanoid()
      insertNewComponent(draft, copiedComponent)
    }),

    //选中上一个
    selectPrevComponent: produce((draft: ComponentStateType) => {
      const { selectledId, componentList } = draft
      const selectIndex = componentList.findIndex(item => item.uuid === selectledId)
      if (selectIndex < 0) return
      if (selectIndex === 0) return
      draft.selectledId = componentList[selectIndex - 1].uuid
    }),

    //选中下一个
    selectNextvComponent: produce((draft: ComponentStateType) => {
      const { selectledId, componentList } = draft
      const selectIndex = componentList.findIndex(item => item.uuid === selectledId)
      if (selectIndex < 0) return
      if (selectIndex === componentList.length - 1) return
      draft.selectledId = componentList[selectIndex + 1].uuid
    }),
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
  copySelectComponent,
  pasteSelectComponent,
  selectPrevComponent,
  selectNextvComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
