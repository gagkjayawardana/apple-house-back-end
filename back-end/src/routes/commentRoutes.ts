import { addCommentRules } from '../validation/commentValidation'
import { addCommentController } from '../controllers/commentController'
import express from 'express'
import { checkValidation } from '../validation/checkValidation'

const router = express.Router()

router.route('/addComment').post(addCommentRules(), checkValidation, addCommentController)

export default router
