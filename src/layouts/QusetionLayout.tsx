import React, { FC } from 'react'
import { Outlet } from 'react-router-dom'
const QusetionLayout: FC = () => {
  return (
    <div>
      <div>QusetionLayout header</div>
      <div>
        <Outlet />
      </div>
      <div>QusetionLayout footer</div>
    </div>
  )
}

export default QusetionLayout
