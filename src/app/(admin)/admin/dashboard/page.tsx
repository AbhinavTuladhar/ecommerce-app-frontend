'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import Button from '@/components/ui/button'
import AdminGuard from '@/layouts/admin-guard'
import Container from '@/layouts/container'
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
      <Container>
        <div>Admin dashboard</div>
        <Button onClick={() => mutate()}> Logout </Button>
      </Container>
    </AdminGuard>
  )
}

export default Dashboard
