import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import { DeleteOutlined, EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import {
  deleteSelectComponent,
  changeComponentsHidden,
  toggleComponentLock,
} from '@/store/features/componentsReducer'
import { useDispatch } from 'react-redux'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
const EditToolbar: FC = () => {
  const dispatch = useDispatch()
  const { selectledId, selectedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
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
  return (
    <div>
      <Space>
        <Tooltip title="删除">
          <Button shape="circle" icon={<DeleteOutlined />} onClick={handleDelete}></Button>
        </Tooltip>
        <Tooltip title="隐藏">
          <Button shape="circle" icon={<EyeInvisibleOutlined />} onClick={handleHidden}></Button>
        </Tooltip>
        <Tooltip title="锁定">
          <Button
            shape="circle"
            icon={<LockOutlined />}
            onClick={handleLocked}
            type={isLocked ? 'primary' : 'default'}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditToolbar
