'use client'

import React from 'react'

import ProductCard from '@/components/product-card'
import Container from '@/layouts/container'
import ProductService from '@/services/product.service'
import { useQuery } from '@tanstack/react-query'

const ProductPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['product'],
    queryFn: ProductService.getProducts,
  })

  if (isLoading) {
    return (
      <Container>
        <span>Loading... </span>
      </Container>
    )
  }

  if (isError) {
    return (
      <Container>
        <span> error </span>
      </Container>
    )
  }

  if (!data) {
    return (
      <Container>
        <span> No data </span>
      </Container>
    )
  }

  const { data: productData } = data

  return (
    <Container>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {productData.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Container>
  )
}

export default ProductPage
