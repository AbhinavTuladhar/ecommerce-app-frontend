import React from 'react'

import CategoryForm from '@/components/admin/category-form'
import AdminFormContainer from '@/layouts/admin-form-container'

const Page = () => {
  return (
    <div className="flex flex-col gap-y-6">
      <h2 className="text-3xl font-bold"> Create a New Category</h2>
      <AdminFormContainer>
        <CategoryForm />
      </AdminFormContainer>
    </div>
  )
}

export default Page
