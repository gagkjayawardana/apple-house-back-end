import { loginUserRules, registerUserRules } from '../validation/userValidation'
import {
  getLogedUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController
} from '../controllers/userController'
import express from 'express'
import { checkValidation } from '../validation/checkValidation'
import { authorization } from '../middleware/authGuards'

const router = express.Router()

router.route('/register').post(registerUserRules(), checkValidation, registerUserController)
router.route('/login').post(loginUserRules(), checkValidation, loginUserController)
router.route('/getUser').get(getLogedUserController)
router.route('/refresh').post(refreshUserController)
router.route('/logout').get(authorization, logoutUserController)

export default router
