'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { z } from 'zod'

import Loader from '@/components/loader'
import Button from '@/components/ui/button'
import ImageUpload from '@/components/ui/image-upload'
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
import ImageUploadService from '@/services/image-upload.service'
import { ProductSchema } from '@/types/schema'
import { ErrorMessage } from '@hookform/error-message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type ProductFormValues = z.infer<typeof ProductSchema>

const ProductForm = () => {
  const params = useParams() as { id: string }
  // Fetch data of single product if editing to populate the form.
  const isEditing = Boolean(params?.id)

  // For invalidating the product list
  const queryClient = useQueryClient()

  // For setting the default value of the select dropdown correctly
  const [isFormReady, setIsFormReady] = useState(false)

  // For the image upload component
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>()

  // For the file upload
  const { mutate: uploadImage } = useMutation({
    mutationFn: ImageUploadService.uploadImage,
    onSuccess: data => {
      setImageUrl(data.filePath)
    },
    onError: error => {
      console.error(error)
    },
  })

  const {
    control,
    register,
    reset,
    formState: { errors },
    setValue,
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
      // Only clear the form if the admin is creating a product.
      if (!isEditing) {
        reset()
      }

      if (file) {
        uploadImage(file)
        toast.success('Image uploaded successfully!')
      }

      setValue('image', imageUrl || '')

      const finalData: ProductFormValues = {
        ...data,
        image: imageUrl,
      }
      console.log(finalData)
      toast.success('Product successfully created!', { toastId: 'product-created' })
      queryClient.invalidateQueries({ queryKey: ['products'] })
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (!productData || !categoryData) return

    const { category, description, image, name, price, quantity } = productData.data

    reset({
      name,
      description,
      price,
      quantity,
      category: category.id.toString(),
      image: image || '',
    })

    setIsFormReady(true)
  }, [reset, productData, categoryData])

  if (isLoading || isLoadingCategories) {
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

  if (!isFormReady && isEditing) {
    return (
      <FullScreenLayout>
        <Loader />
      </FullScreenLayout>
    )
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
          required
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
        required
      />
      <InputField
        {...register('quantity', { valueAsNumber: true })}
        label="Quantity"
        placeholder="Quantity"
        type="number"
        errors={errors}
        required
      />
      <div className="col-span-2">
        <span className="text-sm">
          Category <span className="text-red-400"> * </span>
        </span>
        <Controller
          control={control}
          name="category"
          render={({ field }) => (
            <Select value={field.value} onValueChange={value => field.onChange(value)}>
              <SelectTrigger className="bg-slate-700">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700">
                {categoryData?.data.map(category => (
                  <SelectItem
                    className="cursor-pointer duration-300 hover:bg-blue-800"
                    key={category.id.toString()}
                    value={category.id.toString()}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
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
      <div className="col-span-2 flex flex-col gap-y-1">
        <span className="text-sm"> Image </span>
        <ImageUpload onFileSelect={setFile} />
      </div>
      <div className="col-span-2 flex justify-end">
        <Button type="submit" className="mt-4 w-min">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default ProductForm
