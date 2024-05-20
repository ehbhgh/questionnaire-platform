import React, { FC } from 'react'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import { getComponentConfByType, ComponentPropsType } from '@/components/QuestionComponents'
import { changeComponentProps } from '@/store/features/componentsReducer'
import { useDispatch } from 'react-redux'
const NoProps = () => {
  return <div style={{ textAlign: 'center', marginTop: '20px', color: '#aaa' }}>未选中组件</div>
}
const ComponentsProps: FC = () => {
  const { selectedComponent } = useGetComponentInfo()
  const dispatch = useDispatch()
  if (!selectedComponent) {
    return <NoProps />
  }
  const { type, props, isLocked } = selectedComponent
  const componentConfig = getComponentConfByType(type)

  if (!componentConfig) {
    return <NoProps />
  }

  const { PropComponent } = componentConfig

  const onChangeProps = (newProps: ComponentPropsType) => {
    if (selectedComponent === null) return
    const { uuid } = selectedComponent
    dispatch(
      changeComponentProps({
        uuid,
        newProps,
      })
    )
  }
  return (
    <div>
      <PropComponent {...props} onChange={onChangeProps} disabled={isLocked} />
    </div>
  )
}

export default ComponentsProps
