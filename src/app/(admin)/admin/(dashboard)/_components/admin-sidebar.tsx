'use client'

import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GoTag } from 'react-icons/go'
import { IoIosLogOut } from 'react-icons/io'
import { MdOutlineDashboard } from 'react-icons/md'
import { RxCube } from 'react-icons/rx'
import { toast } from 'react-toastify'

import AuthService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'

const menuLinks = [
  { icon: MdOutlineDashboard, label: 'Dashboard', link: '/dashboard' },
  { icon: RxCube, label: 'Products', link: '/products' },
  { icon: GoTag, label: 'Categories', link: '/categories' },
]
const AdminProfile = () => (
  <div className="px-8 py-4">
    <div>Admin Profile</div>
  </div>
)

const NavigationMenu = () => (
  <nav className="flex-1 py-2">
    <ul>
      {menuLinks.map((link, index) => (
        <li key={index}>
          <Link
            href={`/admin/${link.link}`}
            className="flex items-center gap-x-4 p-4 duration-300 hover:bg-blue-900"
          >
            <link.icon className="text-xl" />
            <span>{link.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

const LogoutRow = () => {
  const { push } = useRouter()

  const { mutate } = useMutation({
    mutationFn: AuthService.logout,
    onSuccess: () => {
      toast.success('Logout successful')
      push('/admin/login')
    },
    onError: () => {
      toast.error('Logout failed')
    },
  })

  return (
    <div className="py-2">
      <button
        className="flex w-full cursor-pointer items-center gap-x-2 px-4 py-4 duration-300 hover:bg-blue-900"
        onClick={() => mutate()}
      >
        <IoIosLogOut className="text-2xl" />
        <span> Logout </span>
      </button>
    </div>
  )
}

export const AdminSidebar = () => {
  return (
    <aside className="relative top-0 bottom-0 left-0 flex flex-col divide-y divide-gray-600 bg-blue-950">
      <AdminProfile />
      <NavigationMenu />
      <LogoutRow />
    </aside>
  )
}
