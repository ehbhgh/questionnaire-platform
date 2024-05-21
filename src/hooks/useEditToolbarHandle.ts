import {
  deleteSelectComponent,
  copySelectComponent,
  pasteSelectComponent,
  changeComponentsHidden,
  toggleComponentLock,
  selectPrevComponent,
  selectNextvComponent,
} from '@/store/features/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from './useGetComponentInfo'

const useEditToolbarHandle = () => {
  const dispatch = useDispatch()
  //获取选中组件的id
  const { selectledId } = useGetComponentInfo()
  //删除组件
  const handleDelete = () => {
    dispatch(deleteSelectComponent())
  }
  //隐藏组件
  const handleHidden = () => {
    dispatch(changeComponentsHidden({ uuid: selectledId, isHidden: true }))
  }
  //锁定组件
  const handleLocked = () => {
    dispatch(toggleComponentLock({ uuid: selectledId }))
  }
  //复制
  const handleCopy = () => {
    dispatch(copySelectComponent())
  }
  //粘贴
  const handlePaste = () => {
    dispatch(pasteSelectComponent())
  }
  //上移上一个
  const handlePrev = () => {
    dispatch(selectPrevComponent())
  }
  //下移下一个
  const handleNext = () => {
    dispatch(selectNextvComponent())
  }
  return {
    handleDelete,
    handleHidden,
    handleLocked,
    handleCopy,
    handlePaste,
    handlePrev,
    handleNext,
  }
}

export default useEditToolbarHandle
