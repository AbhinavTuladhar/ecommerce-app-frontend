import { LoginForm, LoginResponse } from '@/types'

import Api from './api'

class AuthService {
  static async login(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login', body)
    return response.data
  }

  static async loginAsAdmin(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login/admin', body)
    return response.data
  }

  /**
   * Get the information of the logged in user. Doubles as a check for whether the user is authenticated
   */
  static async getProfile() {
    const response = await Api.get('/auth/profile')
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

  static async logout() {
    const response = await Api.post('/auth/logout')
    return response
  }
}

export default AuthService
