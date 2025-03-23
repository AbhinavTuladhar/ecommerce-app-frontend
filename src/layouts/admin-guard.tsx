'use client'

import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'

import Loader from '@/components/loader'
import useAdmin from '@/hooks/useAdmin'

import FullScreenLayout from './full-screen-layout'

const AdminGuard = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter()
  const { isLoading, isError } = useAdmin()

  if (isLoading) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
  }

  if (isError) {
    push('/admin/login')
    return
  }

  return <>{children}</>
}

export default AdminGuard
