'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import Loader from '@/components/loader'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import useCurrentUser from '@/hooks/useCurrentUser'
import FullScreenLayout from '@/layouts/full-screen-layout'
import AuthService from '@/services/auth.service'
import { LoginSchema } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

type LoginFormValues = z.infer<typeof LoginSchema>

const LoginForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await AuthService.loginAsAdmin(data)
      console.log({ response })
    } catch (error) {
      console.error(error)
      setError('password', {
        message: 'The credentials are invalid',
      })
      return
    }

    toast.success('Login successful')
    router.push('/admin/dashboard')
  }

  return (
    <div className="w-100 max-w-[calc(100vw-2rem)] space-y-8 rounded-lg border border-gray-500 bg-slate-800 px-10 py-20">
      <h2 className="text-3xl font-bold"> Login as Admin </h2>
      <form className="grid gap-0" onSubmit={handleSubmit(onSubmit)}>
        <InputField {...register('email')} label="Email" type="email" errors={errors} />
        <InputField {...register('password')} label="Password" type="password" errors={errors} />
        <Button className="mt-2"> Login </Button>
      </form>
    </div>
  )
}

const AdminLogin = () => {
  const { push } = useRouter()

  // If the admin is already logged in, redirect to the dashboard
  const { isLoading, isError } = useCurrentUser()

  // No error implies that the admin is already logged in, so redirect to the dashboard
  useEffect(() => {
    if (!isLoading && !isError) {
      push('/admin/dashboard')
    }
  }, [isError, isLoading, push])

  if (isLoading) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
  }

  if (!isError) {
    return
  }

  return (
    <div className="grid flex-1 place-items-center">
      <LoginForm />
    </div>
  )
}

export default AdminLogin
