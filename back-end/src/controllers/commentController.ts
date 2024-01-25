import { Request, Response } from 'express'
import { addCommentService, getPostCommentsService } from '../services/commentService'

export const addCommentController = async (req: Request, res: Response) => {
  try {
    const { postId, commentUser, comment } = req.body
    const result = await addCommentService({ postId, commentUser, comment })
    res.status(200).json(result)
  } catch (err) {
    res.status(400).send('Comment not added')
  }
}

export const getPostCommentsController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const result = await getPostCommentsService(postId)
    res.status(200).json(result)
  } catch (err) {
    res.status(400).send('Cannot find comments')
  }
}
