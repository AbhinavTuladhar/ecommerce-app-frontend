'use client'

import React from 'react'

import ProductForm from '@/components/admin/product-form'
import AdminFormContainer from '@/layouts/admin-form-container'

const AddProduct = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold"> Create a New Product</h2>
      <AdminFormContainer>
        <ProductForm />
      </AdminFormContainer>
    </div>
  )
}

export default AddProduct
