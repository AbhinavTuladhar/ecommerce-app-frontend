import React, { FC } from 'react'
import { toast } from 'react-toastify'

import ResourceActions from '@/components/admin/resource-actions'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import CategoryService from '@/services/category.service'
import { Category } from '@/types'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CategoryRowProps extends Category {
  onDelete: (id: string) => void
}

const CategoryRow: FC<CategoryRowProps> = ({ id, name, productCount, onDelete }) => (
  <TableRow>
    <TableCell>{name}</TableCell>
    <TableCell>{productCount}</TableCell>
    <TableCell>
      <ResourceActions
        resourceName="category"
        editLink={`/admin/categories/edit/${id}`}
        onDelete={() => onDelete(id)}
      />
    </TableCell>
  </TableRow>
)

interface CategoryTableProps {
  categoryData: Category[]
}

export const CategoryTable: FC<CategoryTableProps> = ({ categoryData }) => {
  const queryClient = useQueryClient()

  const headerNames = ['Category', 'Products', 'Actions']

  const { mutate: deleteCategory } = useMutation({
    mutationFn: CategoryService.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] })
      toast.success('Category deleted successfully')
    },
    onError: () => {
      toast.error('Category delete failed')
    },
  })

  const handleDelete = (id: string) => {
    deleteCategory(id)
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
        {categoryData.map(category => (
          <CategoryRow
            key={category.id}
            id={category.id}
            name={category.name}
            productCount={category.productCount}
            onDelete={handleDelete}
          />
        ))}
      </TableBody>
    </Table>
  )
}
