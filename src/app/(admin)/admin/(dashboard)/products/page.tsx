'use client'

import React from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { GoPlus } from 'react-icons/go'

import Button from '@/components/ui/button'
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

  const { register } = useForm<{ searchString: string }>({
    defaultValues: { searchString: '' },
    mode: 'onChange',
  })

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
    <>
      <div className="flex justify-between">
        <h2> Product List</h2>
        <Input {...register('searchString')} />
      </div>
      <ProductTable productData={productData} />
      <div className="flex justify-end">
        <Link href="/admin/products/add">
          <Button variant="dashed">
            <div className="flex items-center gap-x-1">
              <GoPlus className="text-xl" />
              <span className="text-sm">Add product</span>
            </div>
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Page
