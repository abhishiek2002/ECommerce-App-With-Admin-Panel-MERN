import React from 'react'
import { Outlet } from 'react-router-dom'

export default function AdminLayout() {
  return (
    <div>
      <div>AdminLAyout Header</div>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
