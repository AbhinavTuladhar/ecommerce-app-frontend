'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import { LoginSchema } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

type LoginFormValues = z.infer<typeof LoginSchema>

const AdminLogin = () => {
  const { register, handleSubmit } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = (data: LoginFormValues) => console.log(data)

  return (
    <div className="grid flex-1 place-items-center">
      <div className="w-100 max-w-[calc(100vw-2rem)] space-y-8 rounded-lg border border-gray-500 bg-slate-800 px-4 py-10">
        <h2 className="text-3xl font-bold"> Login as Admin </h2>
        <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
          <InputField {...register('email')} label="Email" type="email" />
          <InputField {...register('password')} label="Password" type="password" />
          <Button> Login </Button>
        </form>
      </div>
    </div>
  )
}

export default AdminLogin
