'use client'

import React, { useState } from 'react'
import Link from 'next/link'
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
    queryKey: ['product'],
    queryFn: () => ProductService.getProducts(),
    retry: false,
  })

  const [searchString, setSearchString] = useState('')

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

  const filteredProducts = productData.filter(product =>
    product.name.toLowerCase().includes(searchString.toLowerCase()),
  )

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold"> Product List</h2>
        <div className="text-sm">
          <Input
            value={searchString}
            onChange={e => setSearchString(e.target.value)}
            placeholder="Search for a product..."
          />
        </div>
      </div>
      <ProductTable productData={filteredProducts} />
      <div className="mt-4 flex justify-end">
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
