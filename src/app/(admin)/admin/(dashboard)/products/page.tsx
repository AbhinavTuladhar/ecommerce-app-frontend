'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import Input from '@/components/ui/input'
import ProductService from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

import { ProductTable } from './_components'

const Page = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => ProductService.getProducts(),
    retry: false,
  })

  const { register, watch } = useForm<{ searchString: string }>({
    defaultValues: { searchString: '' },
    mode: 'onChange',
  })

  const formValues = watch()

  useEffect(() => {
    console.log(formValues)
  }, [formValues])

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!products) {
    return <div>No products</div>
  }

  const { data: productData } = products

  return (
    <div>
      <div className="flex justify-between">
        <h2> Product List</h2>
        <Input {...register('searchString')} />
      </div>
      <ProductTable productData={productData} />
    </div>
  )
}

export default Page
