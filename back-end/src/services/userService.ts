import { config } from '../utils/config'
import { AppDataSource } from '../dataSource'
import { User } from '../entities/userEntity'
import { LoginUserType, RegisterUserType, TokenType, UserType } from './userServiceTypes'
import jwt, { JwtPayload } from 'jsonwebtoken'
import * as bcrypt from 'bcrypt'

const userRepository = AppDataSource.getRepository(User)

export const registerUserService = async (data: RegisterUserType) => {
  try {
    const user = new User()
    user.userName = data.userName
    user.email = data.email
    user.password = data.password
    return await userRepository.save(user)
  } catch (err) {
    return { error: 'Registration Failed' }
  }
}

export const loginUserService = async (data: LoginUserType) => {
  try {
    const findUser = await userRepository.findOneBy({ email: data.email })
    if (!findUser) {
      return { error: 'Cannot find user' }
    } else {
      const checkPassword = await bcrypt.compare(data.password, findUser.password)
      if (!checkPassword) {
        return { error: 'Password are not match' }
      } else {
        return findUser
      }
    }
  } catch (err) {
    return { error: 'Login Failed' }
  }
}

export const createToken = (user: UserType): TokenType => {
  try {
    const secretKey = config.jwt_secret_key
    const dataStoredInToken = {
      email: user.email,
      role: user.role
    }
    return {
      newAccessToken: jwt.sign(dataStoredInToken, secretKey, { expiresIn: '1h' }),
      newRefreshToken: jwt.sign(dataStoredInToken, secretKey, { expiresIn: '24h' }),
      user,
      error: ''
    }
  } catch (err) {
    return { error: 'Tokens are not created', user: {} as UserType, newAccessToken: '', newRefreshToken: '' }
  }
}

export const getLogedUserService = async (accessToken: string) => {
  try {
    const verifyToken = jwt.verify(accessToken, config.jwt_secret_key) as JwtPayload
    if (!verifyToken) {
      return { error: 'Unauthorized User' }
    } else {
      const userEmail = verifyToken.email
      const findUser = await userRepository.findOneBy({ email: userEmail })
      return findUser
    }
  } catch (err) {
    return { error: 'Cannot find user' }
  }
}

export const refreshUserService = async (refreshToken: string) => {
  try {
    const verifyToken = jwt.verify(refreshToken, config.jwt_secret_key) as JwtPayload
    if (!verifyToken) {
      return { error: 'Unauthorized user' }
    } else {
      const userEmail = verifyToken.email
      const findUser = await userRepository.findOneBy({
        email: userEmail
      })
      const secretKey = config.jwt_secret_key
      const tokenData = {
        email: findUser.email,
        role: findUser.role
      }
      const newAccessToken = jwt.sign(tokenData, secretKey, { expiresIn: '1h' })
      return {
        newAccessToken,
        tokenData
      }
    }
  } catch (err) {
    return { error: 'Cannot create new access token' }
  }
}
