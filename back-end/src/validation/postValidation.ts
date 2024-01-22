import { body, check } from 'express-validator'

export const addNewPostRules = () => {
  return [
    body('userName', 'Name is required').notEmpty(),
    body('postQuestion', 'Post question is required').notEmpty(),
    body('postFeedback').optional({ nullable: true })
  ]
}

export const addFeedbackRules = () => {
  return [body('postFeedback', 'Feedback is required').notEmpty()]
}

const isValidStatus = (value: string) => {
  return ['Approved', 'Rejected'].includes(value.replace(/['"]/g, ''))
}

export const changeStatusRules = () => {
  return [check('postStatus').custom(isValidStatus).withMessage('Status must be "Approved" or "Rejected"')]
}
