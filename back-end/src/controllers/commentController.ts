import { Request, Response } from 'express'
import { addCommentService } from '../services/commentService'

export const addCommentController = async (req: Request, res: Response) => {
  try {
    const { postId, commentUser, comment } = req.body
    const result = await addCommentService({ postId, commentUser, comment })
    res.status(200).json(result)
  } catch (err) {
    res.status(400).send('Comment not added')
  }
}
