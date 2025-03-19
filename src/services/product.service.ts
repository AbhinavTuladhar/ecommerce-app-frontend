import { Product, SuccessResponse } from '@/types'

import Api from './api'

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
}

export default ProductService
