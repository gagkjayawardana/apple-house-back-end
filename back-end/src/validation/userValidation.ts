import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const registerUserRules = () => {
  return [
    body('userName', 'Name is required').notEmpty(),
    body('email', 'Enter valid email').notEmpty().isEmail(),
    body('password', 'Enter valid password')
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  ]
}

export const loginUserRules = () => {
  return [body('email', 'Enter valid email').notEmpty().isEmail(), body('password', 'Password is required').notEmpty()]
}

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    return next()
  }
}
