import { FileUploadResponse } from '@/types'

import Api from './api'

class ImageUploadService {
  static async uploadImage(file: File) {
    const formData = new FormData()

    formData.append('file', file)

    const response = await Api.post<FileUploadResponse>('/image-upload/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    return response.data
  }
}

export default ImageUploadService
