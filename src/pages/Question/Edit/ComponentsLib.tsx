import React, { FC } from 'react'
import { Typography } from 'antd'
import { nanoid } from 'nanoid'
import styles from '../css/edit-components-lib.module.scss'
import { addNewComponent } from '@/store/features/componentsReducer'
import { useDispatch } from 'react-redux'
import { componentConGroup, ComponentConType } from '@/components/QuestionComponents'
const ComponentsLib: FC = () => {
  const componentList = componentConGroup()
  const { Title } = Typography
  const componentsRender = (c: ComponentConType, i: number) => {
    const { Component, title, type, defaultProps } = c
    const dispatch = useDispatch()
    const hancleClick = () => {
      dispatch(
        addNewComponent({
          uuid: nanoid(),
          title,
          type,
          props: defaultProps,
        })
      )
    }
    return (
      <div className={styles.wapper} key={i} onClick={hancleClick}>
        <div className={styles.component}>
          <Component />
        </div>
      </div>
    )
  }
  return (
    <div>
      {componentList.map((group, index) => {
        const { groupName, components, groupId } = group
        return (
          <div key={groupId}>
            <Title level={3} style={{ fontSize: '16px', marginTop: index > 0 ? '20px' : '0px' }}>
              {groupName}
            </Title>
            <div>{components.map((c, i) => componentsRender(c, i))}</div>
          </div>
        )
      })}
    </div>
  )
}

export default ComponentsLib
