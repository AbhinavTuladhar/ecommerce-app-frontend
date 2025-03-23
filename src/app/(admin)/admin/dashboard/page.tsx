'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Button from '@/components/ui/button'
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
      <Button onClick={() => toast.success('Test')}> CLick me</Button>
    </div>
  )
}

export default Dashboard
