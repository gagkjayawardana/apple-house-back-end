import {
  addFeedbackController,
  addNewPostController,
  changePostStatusController,
  deletePostController
} from '../controllers/postController'
import express from 'express'
import { checkValidation } from '../validation/checkValidation'
import { addFeedbackRules, addNewPostRules, changeStatusRules } from '../validation/postValidation'
import { adminPermisions, authorization } from '../middleware/authGuards'

const router = express.Router()

router.route('/newPost').post(authorization, addNewPostRules(), checkValidation, addNewPostController)
router.route('/addFeedback/:postId').put(adminPermisions, addFeedbackRules(), checkValidation, addFeedbackController)
router
  .route('/changeStatus/:postId')
  .put(adminPermisions, changeStatusRules(), checkValidation, changePostStatusController)
router.route('/deletePost/:postId').delete(authorization, deletePostController)

export default router
