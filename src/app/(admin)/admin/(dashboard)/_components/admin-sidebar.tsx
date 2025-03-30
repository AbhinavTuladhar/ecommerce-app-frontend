'use client'

import React from 'react'

import AdminProfile from './admin-profile'
import Logout from './logout'
import NavigationMenu from './navigation-menu'

export const AdminSidebar = () => {
  return (
    <aside className="sticky top-0 bottom-0 left-0 flex h-dvh flex-col divide-y divide-gray-600 self-start bg-blue-950">
      <AdminProfile />
      <NavigationMenu />
      <Logout />
    </aside>
  )
}
