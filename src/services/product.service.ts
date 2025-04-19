import { Product, ProductCreation, SuccessResponse } from '@/types'

import Api from './api'

interface ProductUpdateProps {
  id: string
  product: Partial<ProductCreation>
}

class ProductService {
  static async getProducts() {
    try {
      const response = await Api.get<SuccessResponse<Product[]>>('/product')
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  static async getProduct(id: string) {
    try {
      const response = await Api.get<SuccessResponse<Product>>(`/product/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  static async createProduct(product: ProductCreation) {
    const response = await Api.post('/product', product)
    return response
  }

  static async updateProduct({ id, product }: ProductUpdateProps) {
    const response = await Api.patch(`/product/${id}`, product)
    return response
  }

  static async deleteProduct(id: string) {
    try {
      const response = await Api.delete(`/product/${id}`)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default ProductService
