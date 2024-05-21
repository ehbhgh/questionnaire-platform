import React, { FC } from 'react'
import { Button, Space, Tooltip } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
} from '@ant-design/icons'
import useEditToolbarHandle from '@/hooks/useEditToolbarHandle'
import useGetComponentInfo from '@/hooks/useGetComponentInfo'
const EditToolbar: FC = () => {
  const { selectedComponent, copiedComponent } = useGetComponentInfo()
  const { isLocked } = selectedComponent || {}
  const { handleDelete, handleHidden, handleLocked, handleCopy, handlePaste } =
    useEditToolbarHandle()
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
        <Tooltip title="复制">
          <Button shape="circle" icon={<CopyOutlined />} onClick={handleCopy}></Button>
        </Tooltip>

        <Tooltip title="粘贴">
          <Button
            shape="circle"
            icon={<BlockOutlined />}
            onClick={handlePaste}
            disabled={!copiedComponent}
          ></Button>
        </Tooltip>
      </Space>
    </div>
  )
}

export default EditToolbar
