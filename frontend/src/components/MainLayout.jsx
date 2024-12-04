import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <> 
     Sidebar
      <div><Outlet/></div>
    </>
  )
}

export default MainLayout