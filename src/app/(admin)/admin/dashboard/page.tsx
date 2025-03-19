'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import useAdmin from '@/hooks/useAdmin'
const Dashboard = () => {
  const { push } = useRouter()

  const { isLoading, isError } = useAdmin()

  if (isLoading) {
    return <div className="content-grid content-grid--content">Loading...</div>
  }

  if (isError) {
    push('/admin/login')
    return
  }

  return (
    <div className="content-grid content-grid--content">
      <div>Admin dashboard</div>
    </div>
  )
}

export default Dashboard
