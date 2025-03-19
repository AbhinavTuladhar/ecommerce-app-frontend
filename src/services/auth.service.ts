import { LoginForm, LoginResponse } from '@/types'

import Api from './api'

class AuthService {
  static async login(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login', body)
    return response.data
  }

  static async getUsers() {
    const response = await Api.get('/user')
    return response.data
  }

  static async checkIfAdmin() {
    const response = await Api.get('/auth/is-admin')
    return response.status === 200
  }
}

export default AuthService
