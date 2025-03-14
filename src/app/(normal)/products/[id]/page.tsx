import React, { Suspense } from 'react'
import { NextPage } from 'next'

import ImageWithFallback from '@/components/image-with-fallback'
import ProductService from '@/services/product.service'

import { ProductInfo } from './_components'

interface ProductPageProps {
  params: {
    id: string
  }
}

const ProductPage: NextPage<ProductPageProps> = async ({ params }) => {
  const { id } = await params
  const productData = await ProductService.getProduct(id)

  if (!productData) {
    return <div className="content-grid content-grid--content">No data</div>
  }

  const { image, name, price, quantity, category, description } = productData.data

  return (
    <div className="content-grid content-grid--content">
      <Suspense fallback={<div>Loading...</div>}>
        <div className="grid grid-cols-2 gap-x-4">
          <div className="border border-gray-400 p-4">
            <ImageWithFallback
              src={image as string}
              alt="Product Image"
              width={200}
              height={200}
              className="h-full w-full object-cover"
            />
          </div>
          <ProductInfo
            category={category}
            name={name}
            price={price}
            quantity={quantity}
            description={description}
          />
        </div>
      </Suspense>
    </div>
  )
}

export default ProductPage
