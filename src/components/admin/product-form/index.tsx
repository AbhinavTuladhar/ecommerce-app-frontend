'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import Loader from '@/components/loader'
import Button from '@/components/ui/button'
import InputField from '@/components/ui/input-field'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import TextAreaField from '@/components/ui/textarea-field'
import useCategories from '@/hooks/useCategories'
import useProduct from '@/hooks/useProduct'
import FullScreenLayout from '@/layouts/full-screen-layout'
import { ProductSchema } from '@/types/schema'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'

type ProductFormValues = z.infer<typeof ProductSchema>

const ProductForm = () => {
  const params = useParams() as { id: string }
  // Fetch data of single product if editing to populate the form.
  const isEditing = Boolean(params?.id)

  // For invalidating the product list
  const queryClient = useQueryClient()

  const {
    control,
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
  })

  const {
    data: productData,
    isLoading,
    isError,
  } = useProduct(params.id, {
    enabled: isEditing,
  })

  const { data: categoryData, isLoading: isLoadingCategories } = useCategories()

  const onSubmit = (data: ProductFormValues) => {
    try {
      console.log(data)
      toast.success('Product successfully created!', { toastId: 'product-created' })
      queryClient.invalidateQueries({ queryKey: ['products'] })
      reset()
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!productData) return

    const { category, description, image, name, price, quantity } = productData.data

    reset({
      name,
      description,
      price,
      quantity,
      category: category.id,
      image: image || '',
    })
  }, [reset, productData])

  if (isLoading) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!productData && isEditing) {
    return <div>No data</div>
  }

  return (
    <form className="grid grid-cols-2 gap-x-10 gap-y-1" onSubmit={handleSubmit(onSubmit)}>
      <div className="col-span-2">
        <InputField
          {...register('name')}
          label="Product Name"
          placeholder="Product Name"
          type="text"
          errors={errors}
        />
      </div>
      <div className="col-span-2">
        <TextAreaField
          {...register('description')}
          label="Description"
          placeholder="Enter the product description"
          errors={errors}
        />
      </div>
      <InputField
        {...register('price', { valueAsNumber: true })}
        label="Price"
        type="number"
        placeholder="Price (Rs.) "
        errors={errors}
      />
      <InputField
        {...register('quantity', { valueAsNumber: true })}
        label="Quantity"
        placeholder="Quantity"
        type="number"
        errors={errors}
      />
      <div className="col-span-2">
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={value => field.onChange(value)}>
              <SelectTrigger className="bg-slate-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              {isLoadingCategories ? null : (
                <SelectContent className="bg-slate-700">
                  {categoryData?.data.map(category => (
                    <SelectItem
                      className="cursor-pointer duration-300 hover:bg-blue-800"
                      key={category.id}
                      value={category.id}
                    >
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              )}
              <div className="h-5 min-h-5">
                <ErrorMessage
                  errors={errors}
                  name="category"
                  render={({ message }) => <span className="text-sm text-red-400">{message}</span>}
                />
              </div>
            </Select>
          )}
        />
      </div>
      <Button type="submit" className="mt-4 w-min">
        Submit
      </Button>
    </form>
  )
}

export default ProductForm
