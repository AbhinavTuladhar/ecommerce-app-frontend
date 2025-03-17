export interface LoginForm {
  email: string
  password: string
}

export interface LoginResponse {
  message: string
  access_token: string
}
