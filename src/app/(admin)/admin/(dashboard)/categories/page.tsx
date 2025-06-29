'use client'

import React from 'react'
import Link from 'next/link'
import { GoPlus } from 'react-icons/go'

import Button from '@/components/ui/button'
import CategoryService from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'

import { CategoryTable } from './_components'

const CategoryPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['category'],
    queryFn: CategoryService.getCategories,
    retry: false,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error</div>
  }

  if (!data) {
    return <div>No categories</div>
  }

  return (
    <>
      <div className="mb-4 flex justify-between">
        <h2 className="text-2xl font-bold"> Category List</h2>
      </div>
      <CategoryTable categoryData={data.data} />
      <div className="mt-4 flex justify-end">
        <Link href="/admin/categories/add">
          <Button variant="dashed">
            <div className="flex items-center gap-x-1">
              <GoPlus className="text-xl" />
              <span className="text-sm">Add category</span>
            </div>
          </Button>
        </Link>
      </div>
    </>
  )
}

export default CategoryPage
