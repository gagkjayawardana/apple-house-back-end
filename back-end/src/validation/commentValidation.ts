import { body } from 'express-validator'

export const addCommentRules = () => {
  return [
    body('postId', 'Post Id is required').notEmpty(),
    body('commentUser', 'Comment User is required').notEmpty(),
    body('comment', 'Comment is required').notEmpty()
  ]
}
