export interface RegisterUserType {
  userName: string
  email: string
  password: string
}

export interface UserType {
  userId: number
  userName: string
  email: string
  password: string
  role: string
}

export interface TokenType {
  user: UserType
  newAccessToken: string
  newRefreshToken: string
  error: string
}

export interface LoginUserType {
  email: string
  password: string
}
