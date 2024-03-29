import { addCommentRules } from '../validation/commentValidation'
import { addCommentController, getPostCommentsController } from '../controllers/commentController'
import express from 'express'
import { checkValidation } from '../validation/checkValidation'
import { authorization } from '../middleware/authGuards'

const router = express.Router()

router.route('/addComment').post(authorization, addCommentRules(), checkValidation, addCommentController)
router.route('/getComments/:postId').get(authorization, getPostCommentsController)

export default router
