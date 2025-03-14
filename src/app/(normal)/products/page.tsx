'use client'

import React from 'react'

import ProductCard from '@/components/product-card'
import ProductService from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

const ProductPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: ProductService.getProducts,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!data) {
    return <div>No data</div>
  }

  const { data: productData } = data

  return (
    <div className="content-grid content-grid--content">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productData.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductPage
