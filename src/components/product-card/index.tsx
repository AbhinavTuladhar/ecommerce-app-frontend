import React, { FC } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Product } from '@/types'

interface ProductProps {
  product: Product
}

const ProductCard: FC<ProductProps> = ({ product: { id, image, name, price } }) => {
  const imageSource = image
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${image}`
    : '/placeholder-image.jpg'

  return (
    <article className="relative grid gap-y-4 rounded-md border border-gray-400">
      <div className="aspect-product-card relative overflow-hidden">
        <Image
          src={imageSource}
          alt={name}
          width={200}
          height={172}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-col gap-2 px-4 pb-4">
        <span> {name}</span>
        <span>Rs. {price.toLocaleString()}</span>
      </div>
      <Link href={`/products/${id}`} className="absolute inset-0 z-20" />
    </article>
  )
}

export default ProductCard
