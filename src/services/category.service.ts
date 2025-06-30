import { Category, CategoryCreation, SuccessResponse } from '@/types'

import Api from './api'

interface CategoryUpdateProps {
  id: string
  name: string
}

class CategoryService {
  static async getCategories() {
    const response = await Api.get<SuccessResponse<Category[]>>('/category')
    return response.data
  }

  static async getCategory(id: string) {
    const response = await Api.get<SuccessResponse<Category>>(`/category/${id}`)
    return response.data
  }

  static async createCategory(category: CategoryCreation) {
    const response = await Api.post('/category', category)
    return response
  }

  static async deleteCategory(id: string) {
    const response = await Api.delete(`/category/${id}`)
    return response
  }

  static async updateCategory({ id, name }: CategoryUpdateProps) {
    const response = await Api.patch(`/category/${id}`, { name })
    return response
  }
}

export default CategoryService
