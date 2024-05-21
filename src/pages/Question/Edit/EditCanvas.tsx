import React, { FC, MouseEvent } from 'react'
import styles from '../css/edit-canvas.module.scss'
import { Spin } from 'antd'
import { useDispatch } from 'react-redux'
import { changeSelectId } from '@/store/features/componentsReducer'
import { ComponentInfoInterface, ComponentStateType } from '@/types/components'
import { getComponentConfByType } from '@/components/QuestionComponents'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
import useBindCanvasKeyPress from '@/hooks/useBindCanvasKeyPress'
import classNames from 'classnames'
type ProprType = {
  loading: boolean
}
const componentRender = (componentIno: ComponentInfoInterface) => {
  const { type, props } = componentIno
  const componentConf = getComponentConfByType<string>(type)
  if (!componentConf) return null
  const { Component } = componentConf
  return <Component {...props} />
}
const EditCanvas: FC<ProprType> = ({ loading }) => {
  const { componentList, selectledId } = useGetComponentInfo() as ComponentStateType
  const dispatch = useDispatch()
  const handelSelectId = (e: MouseEvent, id: string) => {
    dispatch(changeSelectId(id))
    e.stopPropagation()
  }
  //绑定快捷键
  useBindCanvasKeyPress()
  if (loading) {
    return (
      <div style={{ marginTop: '60px', textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
  return (
    <div className={styles.canvas}>
      {componentList
        .filter(t => !t.isHidden)
        .map(c => {
          const { uuid, isLocked } = c
          const wrapDefultClassName = styles['components-wrap']
          const slectedClassName = styles['components-wrap-selected']
          const lockedClassName = styles['components-wrap-locked']
          const wrapeerClassName = classNames({
            [wrapDefultClassName]: true,
            [slectedClassName]: c.uuid === selectledId,
            [lockedClassName]: isLocked,
          })
          return (
            <div className={wrapeerClassName} key={uuid} onClick={e => handelSelectId(e, uuid)}>
              <div className={styles.component}>{componentRender(c)}</div>
            </div>
          )
        })}
    </div>
  )
}

export default EditCanvas
