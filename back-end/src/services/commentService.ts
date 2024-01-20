import { Post } from '../entities/postEntity'
import { AppDataSource } from '../dataSource'
import { Comment } from '../entities/commentEntity'
import { AddCommentType } from './commentServiceType'

const commentRepository = AppDataSource.getRepository(Comment)
const postRepository = AppDataSource.getRepository(Post)

export const addCommentService = async (data: AddCommentType) => {
  try {
    const findPost = await postRepository.findOneBy({ postId: data.postId })
    if (findPost) {
      const newComment = new Comment()
      newComment.postId = data.postId
      newComment.commentUser = data.commentUser
      newComment.comment = data.comment
      return await commentRepository.save(newComment)
    } else {
      return { error: 'Cannot find post' }
    }
  } catch (err) {
    return { error: 'Comment not added' }
  }
}

export const getAllCommentsService = async () => {
  try {
    const allComments = await commentRepository.find({
      order: {
        commentId: 'ASC'
      }
    })
    if (allComments) {
      return allComments
    } else {
      return { error: 'Comments are not found' }
    }
  } catch (err) {
    return { error: 'Comments are not found' }
  }
}
