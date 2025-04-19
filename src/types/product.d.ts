export interface Product {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image: null | string
  category: {
    id: string
    name: string
  }
}

export interface FileUploadResponse {
  filePath: string
  message: string
}

export interface ProductCreation {
  name: string
  description?: string
  price: number
  quantity: number
  categoryId: string
  image?: string
}
