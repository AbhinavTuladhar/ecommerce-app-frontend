import { LoginForm, LoginResponse } from '@/types'

import Api from './api'

class AuthService {
  static async login(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login', body)
    return response.data
  }
}

export default AuthService
