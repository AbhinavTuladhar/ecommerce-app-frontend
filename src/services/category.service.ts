import { Category, SuccessResponse } from '@/types'

import Api from './api'

class CategoryService {
  static async getCategories() {
    const response = await Api.get<SuccessResponse<Category[]>>('/category')
    return response.data
  }

  static async getCategory(id: string) {
    const response = await Api.get<SuccessResponse<Category>>(`/category/${id}`)
    return response.data
  }
}

export default CategoryService
