import { loginUserRules, registerUserRules, userValidation } from '../validation/userValidation'
import {
  getLogedUserController,
  loginUserController,
  logoutUserController,
  refreshUserController,
  registerUserController
} from '../controllers/userController'
import express from 'express'

const router = express.Router()

router.route('/register').post(registerUserRules(), userValidation, registerUserController)
router.route('/login').post(loginUserRules(), userValidation, loginUserController)
router.route('/getUser').get(getLogedUserController)
router.route('/refresh').post(refreshUserController)
router.route('/logout').get(logoutUserController)

export default router
