import React, { FC } from 'react'
import useLoadQuestionData from '@/hooks/useLoadQuestionData'
import styles from '../css/edit.module.scss'
import { useDispatch } from 'react-redux'
import { changeSelectId } from '@/store/features/componentsReducer'
import EditCanvas from './EditCanvas'
import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'
import EditHeader from './EditHeader'
const Edit: FC = () => {
  const { loading } = useLoadQuestionData()
  const dispatch = useDispatch()
  const clearSelect = () => {
    dispatch(changeSelectId(''))
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <EditHeader />
      </div>
      <div className={styles['content-wrapper']}>
        <div className={styles['content']}>
          <div className={styles['left-content']}>
            <LeftPanel />
          </div>
          <div className={styles['main-content']} onClick={clearSelect}>
            <div className={styles['canvas-wrapper']}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles['right-content']}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
