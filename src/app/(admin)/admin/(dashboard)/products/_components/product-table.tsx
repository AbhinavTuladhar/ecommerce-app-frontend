import { FC } from 'react'

import ImageWithFallback from '@/components/image-with-fallback'
import ResourceActions from '@/components/resource-actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Product } from '@/types'

type ProductRowProps = Pick<Product, 'category' | 'id' | 'image' | 'name' | 'price' | 'quantity'>

const ProductRow: FC<ProductRowProps> = ({ category, id, image, name, price, quantity }) => (
  <TableRow>
    <TableCell>
      <div className="flex items-center gap-x-4">
        <ImageWithFallback
          src={image as string}
          alt={name}
          width={40}
          height={40}
          className="size-10 rounded-lg"
        />
        <span className="text-sm"> {name} </span>
      </div>
    </TableCell>
    <TableCell>{price}</TableCell>
    <TableCell>{quantity}</TableCell>
    <TableCell>{category.name}</TableCell>
    <TableCell>
      <ResourceActions editLink={`/admin/products/${id}`} onDelete={() => {}} />
    </TableCell>
  </TableRow>
)

interface ProductTableProps {
  productData: Product[]
}

export const ProductTable: FC<ProductTableProps> = ({ productData }) => {
  const headerNames = ['Product', 'Price', 'Quantity', 'Category', 'Actions']

  return (
    <Table>
      <TableHeader>
        {headerNames.map(name => (
          <TableHead className="tracking-wider uppercase" key={name}>
            {name}
          </TableHead>
        ))}
      </TableHeader>
      <TableBody>
        {productData.map(({ category, id, image, name, price, quantity }) => (
          <ProductRow
            key={id}
            id={id}
            category={category}
            image={image}
            name={name}
            price={price}
            quantity={quantity}
          />
        ))}
      </TableBody>
    </Table>
  )
}
