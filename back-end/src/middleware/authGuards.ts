import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../utils/config'

export const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      return res.sendStatus(403).send('Token not found')
    } else {
      const tokenData = jwt.verify(accessToken, config.jwt_secret_key) as JwtPayload
      if (tokenData.email) {
        return next()
      } else {
        return res.status(401).send('Do not have Permission')
      }
    }
  } catch (err) {
    return res.sendStatus(403).send('Invalid Token')
  }
}

export const adminPermisions = (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken = req.cookies.accessToken
    if (!accessToken) {
      return res.sendStatus(403).send('Token not found')
    } else {
      const tokenData = jwt.verify(accessToken, config.jwt_secret_key) as JwtPayload
      if (tokenData.role !== 'admin') {
        return res.status(401).send('Do not have Permission')
      } else {
        return next()
      }
    }
  } catch (err) {
    return res.status(403).send('Invalid Token')
  }
}
