'use client'

import React, { ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import Loader from '@/components/loader'
import useAdmin from '@/hooks/useAdmin'

import FullScreenLayout from './full-screen-layout'

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter()
  const pathName = usePathname()
  const { isLoading, isError } = useAdmin()

  console.log(pathName)

  // For preventing visual flashes when going to the protected pages
  useEffect(() => {
    if (!isLoading && !isError) {
      // Get the part after the string '/admin/'
      // This covers the pages other than, and including, 'dashboard'.
      const targetSlug = pathName.split('/admin/')[1]
      push(`/admin/${targetSlug}`)
    }
  }, [isError, isLoading, push, pathName])

  if (isLoading) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
  }

  if (isError && !isLoading) {
    push('/admin/login')
    return
  }

  return <>{children}</>
}

export default AdminGuard
