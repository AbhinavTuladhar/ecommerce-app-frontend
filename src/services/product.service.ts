import axios from 'axios'

import { Product, SuccessResponse } from '@/types'

class ProductService {
  static async getProducts() {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/product`

    try {
      const response = await axios.get<SuccessResponse<Product[]>>(url)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }
}

export default ProductService
