import { useSelector } from 'react-redux'
import type { ComponentStateType, ComponentInfoInterface } from '@/types/components'
type StateType = {
  component: ComponentStateType
}
const useGetComponentInfo = () => {
  const components = useSelector<StateType>(state => state.component)
  const { componentList = [], selectledId = '' } = components as ComponentStateType
  // 获取当前选中组件信息
  const selectedComponent = componentList.find(
    item => item.uuid === selectledId
  ) as ComponentInfoInterface
  return {
    componentList,
    selectledId,
    selectedComponent,
  }
}

export default useGetComponentInfo
