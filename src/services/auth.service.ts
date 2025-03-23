import { LoginForm, LoginResponse } from '@/types'

import Api from './api'

class AuthService {
  /**
   * Attempt to login a normal user
   */
  static async login(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login', body)
    return response.data
  }

  /**
   * Attempt to login as an admin
   */
  static async loginAsAdmin(body: LoginForm) {
    const response = await Api.post<LoginResponse>('/auth/login/admin', body)
    return response.data
  }

  /**
   * Get the information of the logged in user. Doubles as a check for whether the user is authenticated.
   * If the user is not authenticated, this will attempt to refresh the token.
   */
  static async getProfile() {
    try {
      const response = await Api.get('/auth/profile')
      return response.data
    } catch (error) {
      const response = await Api.get('/auth/refresh')
      console.error(error)
      return response
    }
  }

  /**
   * For testing purposes, only the admin can see the list of users
   */
  static async getUsers() {
    const response = await Api.get('/user')
    return response.data
  }

  static async checkIfAdmin() {
    const response = await Api.get('/auth/is-admin')
    return response.status === 200
  }

  /**
   * By logging out, both the access and refresh tokens are cleared.
   */
  static async logout() {
    const response = await Api.post('/auth/logout')
    return response
  }

  /**
   * Get new access and refresh token, provided that the current refresh token is valid.
   */
  static async refreshToken() {
    const response = await Api.get('/auth/refresh')
    return response.data
  }
}

export default AuthService
