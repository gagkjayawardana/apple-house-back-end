import {
  addFeedbackController,
  addNewPostController,
  changePostStatusController,
  deletePostController
} from '../controllers/postController'
import express from 'express'
import { checkValidation } from '../validation/checkValidation'
import { addFeedbackRules, addNewPostRules, changeStatusRules } from '../validation/postValidation'

const router = express.Router()

router.route('/newPost').post(addNewPostRules(), checkValidation, addNewPostController)
router.route('/addFeedback/:postId').put(addFeedbackRules(), checkValidation, addFeedbackController)
router.route('/changeStatus/:postId').put(changeStatusRules(), checkValidation, changePostStatusController)
router.route('/deletePost/:postId').delete(deletePostController)

export default router
