import { useKeyPress } from 'ahooks'
import useEditToolbarHandle from './useEditToolbarHandle'

const isActiveElementVolid = () => {
  const activeElement = document.activeElement
  if (activeElement === document.body) return true
  return false
}
const useBindCanvasKeyPress = () => {
  const { handleDelete, handleCopy, handlePaste, handlePrev, handleNext } = useEditToolbarHandle()
  //删除组件
  useKeyPress(['backspace', 'delete'], () => {
    if (!isActiveElementVolid()) return
    handleDelete()
  })
  // 复制组件
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (!isActiveElementVolid()) return
    handleCopy()
  })

  // 粘贴组件
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (!isActiveElementVolid()) return
    handlePaste()
  })

  //向上移动，选中上一个
  useKeyPress(['uparrow'], () => {
    if (!isActiveElementVolid()) return
    handlePrev()
  })
  //向下移动，选中下一个
  useKeyPress(['downarrow'], () => {
    if (!isActiveElementVolid()) return
    handleNext()
  })
}

export default useBindCanvasKeyPress
