import React, { FC, createContext, useState } from 'react'
import ContextChild from './ContextChild'
import { Button } from 'antd'

const themes = {
  light: {
    foreColor: '#000',
    bgColor: 'yellow',
  },
  dark: {
    foreColor: '#fff',
    bgColor: '#166e35',
  },
}

export const ThemeContext = createContext(themes.light)
const ContextTest: FC = () => {
  const [theme, setTheme] = useState(themes.light)

  const changeTheme = () => {
    setTheme(themes.dark)
  }
  return (
    <div>
      <ThemeContext.Provider value={theme}>
        <h1>changeTheme</h1>
        <Button onClick={changeTheme}>改变主题</Button>
        <ContextChild />
      </ThemeContext.Provider>
    </div>
  )
}

export default ContextTest
