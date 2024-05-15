import React, { FC, useContext } from 'react'
import { Button } from 'antd'
import { ThemeContext } from './ContextTest'
const ContextChild: FC = () => {
  const theme = useContext(ThemeContext)
  return (
    <div>
      <h2>ContextThemeChild</h2>
      <Button style={{ color: theme.foreColor, background: theme.bgColor }}>
        ThemeButton子组件
      </Button>
    </div>
  )
}

export default ContextChild
