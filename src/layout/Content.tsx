import React from 'react'
import { Outlet } from 'react-router-dom'

const Content: React.FC = () => {
  return (
    <div className='content'>
      <Outlet />
    </div>
  )
}

export default Content
