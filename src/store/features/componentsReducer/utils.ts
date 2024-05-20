import type { ComponentInfoInterface } from '@/types/components'

export const getNextSelectedId = (
  uuid: string | undefined,
  componentList: Array<ComponentInfoInterface>
) => {
  componentList = componentList.filter(item => !item.isHidden)
  const index = componentList.findIndex(item => item.uuid === uuid)
  if (index === -1) return ''
  //重新计算选中uuid
  let newSelectId = ''
  const length: number = componentList.length
  //组件长度就只有一个
  if (length <= 1) {
    newSelectId = ''
  } else {
    // 判断是否是最后一个
    if (index + 1 === length) {
      //删除最后一个，就要选中上一个
      newSelectId = componentList[index - 1].uuid
    } else {
      //要删除的不是最后一个，删除以后，选中下一个
      newSelectId = componentList[index + 1].uuid
    }
  }
  return newSelectId
}
