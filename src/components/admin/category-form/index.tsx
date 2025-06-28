'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Loader from '@/components/loader'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import useCategory from '@/hooks/useCategory'
import FullScreenLayout from '@/layouts/full-screen-layout'
import { CategorySchema } from '@/types/schema'
import { zodResolver } from '@hookform/resolvers/zod'

type CategoryFormValues = z.infer<typeof CategorySchema>

const CategoryForm = () => {
  const params = useParams() as { id: string }

  // Fetch data of a category if editing to populate the form.
  const isEditing = Boolean(params?.id)

  const [isFormReady, setIsFormReady] = useState(false)

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(CategorySchema),
  })

  const { data: categoryData, isLoading, isError } = useCategory(params.id, { enabled: isEditing })

  const onSubmit = async (data: CategoryFormValues) => {
    console.log(data)
  }

  // For populating the form.
  useEffect(() => {
    if (!categoryData) return

    const { name } = categoryData.data

    reset({
      name,
    })

    setIsFormReady(true)
  }, [categoryData, reset])

  if (isLoading) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
  }

  if (isError) {
    return <div> Error </div>
  }

  if (!categoryData && isEditing) {
    return <div> No data </div>
  }

  if (!isFormReady && isEditing) return null

  return (
    <form className="grid grid-cols-2 gap-x-10 gap-y-1" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        {...register('name')}
        label="Category Name"
        placeholder="Category Name"
        type="text"
        errors={errors}
        required
      />
      <div className="col-span-2 flex justify-end">
        <Button type="submit" className="mt-4 w-min">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CategoryForm
