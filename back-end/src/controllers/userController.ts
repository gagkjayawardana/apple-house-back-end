import { Request, Response } from 'express'
import {
  createToken,
  getLogedUserService,
  loginUserService,
  refreshUserService,
  registerUserService
} from '../services/userService'

export const registerUserController = async (req: Request, res: Response) => {
  try {
    const { userName, password, email } = req.body
    const user = await registerUserService({
      userName,
      email: email.toLowerCase(),
      password
    })
    if (user && !('error' in user)) {
      const newToken = createToken(user)
      res.cookie('accessToken', newToken.newAccessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })
      res.cookie('refreshToken', newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
      })
      res.status(200).json(user)
    }
  } catch (err) {
    res.sendStatus(400).send('Registartion Failed')
  }
}

export const loginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await loginUserService({
      email: email.toLowerCase(),
      password
    })
    if (user && !('error' in user)) {
      const newToken = createToken(user)
      res.cookie('accessToken', newToken.newAccessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })
      res.cookie('refreshToken', newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
      })
      res.status(200).json(user)
    }
  } catch (err) {
    res.sendStatus(400).send('Login Failed')
  }
}

export const getLogedUserController = async (req: Request, res: Response) => {
  try {
    const userToken = req.cookies.accessToken
    const logedUser = await getLogedUserService(userToken)
    res.status(200).json(logedUser)
  } catch (err) {
    res.status(400).send('Cannot find user')
  }
}

export const refreshUserController = async (req: Request, res: Response) => {
  try {
    const refreshToken = req.cookies.refreshToken
    const userToken = await refreshUserService(refreshToken)
    if (userToken) {
      res.cookie('accessToken', userToken.newAccessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true
      })
      res.status(200).json(userToken)
    }
  } catch (err) {
    res.status(400).send('Cannot create new access token')
  }
}

export const logoutUserController = (req: Request, res: Response) => {
  try {
    res.cookie('accessToken', '', {
      maxAge: -1,
      httpOnly: true
    })
    res.cookie('refreshToken', '', {
      maxAge: -1,
      httpOnly: true
    })

    res.status(200).json({ msg: 'Successfully logged out' })
  } catch (err) {
    res.status(400).send({ error: 'Error with logout' })
  }
}
