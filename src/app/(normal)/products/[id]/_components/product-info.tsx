import React, { FC } from 'react'

import { Product } from '@/types'

type InfoProps = Pick<Product, 'category' | 'description' | 'name' | 'price' | 'quantity'>

export const ProductInfo: FC<InfoProps> = ({ category, description, name, price, quantity }) => (
  <div className="flex flex-col gap-y-4">
    <h2 className="text-xl font-semibold"> {name} </h2>
    <span>
      <span> Category: </span>
      <span className="font-bold"> {category.name} </span>
    </span>
    <h3 className="text-3xl font-bold text-blue-400"> Rs. {price.toLocaleString()}</h3>
    <p> {description}</p>
    <p> Quantity left: {quantity}</p>
  </div>
)
