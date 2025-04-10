'use client'

import React, { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import Loader from '@/components/loader'
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
import { zodResolver } from '@hookform/resolvers/zod'

type ProductFormValues = z.infer<typeof ProductSchema>

const ProductForm = () => {
  const params = useParams() as { id: string }
  // Fetch data of single product if editing to populate the form.
  const isEditing = Boolean(params?.id)

  const methods = useForm<ProductFormValues>({
    resolver: zodResolver(ProductSchema),
  })

  const {
    register,
    reset,
    formState: { errors },
  } = methods

  const {
    data: productData,
    isLoading,
    isError,
  } = useProduct(params.id, {
    enabled: isEditing,
  })

  const { data: categoryData, isLoading: isLoadingCategories } = useCategories()

  useEffect(() => {
    if (!productData) return

    const { category, description, image, name, price, quantity } = productData.data

    reset({
      name,
      description,
      price,
      quantity,
      category: category.name,
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
    <form className="grid grid-cols-2 gap-x-10 gap-y-0">
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
        {...register('price')}
        label="Price"
        type="number"
        placeholder="Product price (Rs.) "
        errors={errors}
      />
      <InputField
        {...register('quantity')}
        label="Quantity"
        placeholder="Product Quantity"
        type="number"
        errors={errors}
      />
      <Select>
        <SelectTrigger className="col-span-2 bg-slate-700">
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
      </Select>
    </form>
  )
}

export default ProductForm
