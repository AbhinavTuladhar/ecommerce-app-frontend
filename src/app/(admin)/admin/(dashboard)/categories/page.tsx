'use client'

import React from 'react'

import CategoryService from '@/services/category.service'
import { useQuery } from '@tanstack/react-query'

import { CategoryTable } from './_components'

const CategoryPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['categories'],
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
    </>
  )
}

export default CategoryPage
