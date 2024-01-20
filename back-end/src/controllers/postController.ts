import { Request, Response } from 'express'
import {
  addFeedbackService,
  addNewPostService,
  changePostStatusService,
  deletePostService,
  getAllPostService
} from '../services/postService'

export const addNewPostController = async (req: Request, res: Response) => {
  try {
    const { userName, postQuestion } = req.body
    const post = await addNewPostService({
      userName,
      postQuestion
    })
    res.status(200).json(post)
  } catch (err) {
    res.status(400).send('Post not added')
  }
}

export const changePostStatusController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const post = req.body
    const changeStatus = await changePostStatusService(postId, post)
    res.status(200).json(changeStatus)
  } catch (err) {
    res.status(400).send('Status not changed')
  }
}

export const addFeedbackController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const post = req.body
    const addFeedback = await addFeedbackService(postId, post)
    res.status(200).json(addFeedback)
  } catch (err) {
    res.status(400).send('Feedback not added')
  }
}

export const deletePostController = async (req: Request, res: Response) => {
  try {
    const postId = parseInt(req.params.postId)
    const accessToken = req.cookies.accessToken
    const result = await deletePostService(postId, accessToken)
    if (result) {
      res.status(200).json(result)
    }
  } catch (err) {
    res.status(400).send('Error in post delete')
  }
}

export const getPostController = async (res: Response) => {
  try {
    const result = await getAllPostService()
    res.status(200).json(result)
  } catch (err) {
    res.status(400).send('Cannot find posts')
  }
}
