'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Button from '@/components/ui/button'
import AdminGuard from '@/layouts/admin-guard'
import AuthService from '@/services/auth.service'
import { useMutation } from '@tanstack/react-query'
const Dashboard = () => {
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
    <AdminGuard>
      <div className="content-grid content-grid--content">
        <div>Admin dashboard</div>
        <Button onClick={() => mutate()}> Logout </Button>
      </div>
    </AdminGuard>
  )
}

export default Dashboard
