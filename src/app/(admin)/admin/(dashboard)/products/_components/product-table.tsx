import { FC } from 'react'
import { toast } from 'react-toastify'

import ResourceActions from '@/components/admin/resource-actions'
import ImageWithFallback from '@/components/image-with-fallback'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import ProductService from '@/services/product.service'
import { Product } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

type ProductRowProps = Pick<
  Product,
  'category' | 'id' | 'image' | 'name' | 'price' | 'quantity'
> & {
  onDelete: (id: string) => void
}

const ProductRow: FC<ProductRowProps> = ({
  category,
  id,
  image,
  name,
  price,
  quantity,
  onDelete,
}) => (
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
      <ResourceActions
        resourceName="product"
        editLink={`/admin/products/edit/${id}`}
        onDelete={() => onDelete(id)}
      />
    </TableCell>
  </TableRow>
)

interface ProductTableProps {
  productData: Product[]
}

export const ProductTable: FC<ProductTableProps> = ({ productData }) => {
  const query = useQueryClient()

  const headerNames = ['Product', 'Price', 'Quantity', 'Category', 'Actions']

  const { mutate: deleteProduct } = useMutation({
    mutationFn: ProductService.deleteProduct,
    onSuccess: () => {
      query.invalidateQueries({ queryKey: ['product'] })
      toast.success('Product deleted successfully')
    },
    onError: () => {
      toast.error('Product delete failed')
    },
  })

  const handleDelete = (id: string) => {
    deleteProduct(id)
  }

  if (productData.length === 0) {
    return <h2 className="text-center text-3xl font-bold"> No products</h2>
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {headerNames.map(name => (
            <TableHead className="tracking-wider uppercase" key={name}>
              {name}
            </TableHead>
          ))}
        </TableRow>
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
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  )
}
