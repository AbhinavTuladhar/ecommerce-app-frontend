import { Category, SuccessResponse } from '@/types'

import Api from './api'

class CategoryService {
  static async getCategories() {
    const response = await Api.get<SuccessResponse<Category[]>>('/category')
    return response.data
  }
}

export default CategoryService
