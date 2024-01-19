import { User } from '../entities/userEntity'
import { AppDataSource } from '../dataSource'
import { Post } from '../entities/postEntity'
import { AddPostType, PostType } from './postServiceTypes'
import Jwt, { JwtPayload } from 'jsonwebtoken'
import { config } from '../utils/config'
import { Comment } from '../entities/commentEntity'

const postRepository = AppDataSource.getRepository(Post)
const userRepository = AppDataSource.getRepository(User)
const commentRepository = AppDataSource.getRepository(Comment)

export const addNewPostService = async (newPost: AddPostType) => {
  try {
    const userName = newPost.userName
    if (userName) {
      const findUser = await userRepository.findOneBy({ userName: userName })
      const userRole = findUser.role
      if (userRole === 'user') {
        const post = new Post()
        post.userName = newPost.userName
        post.postQuestion = newPost.postQuestion
        return await postRepository.save(post)
      } else {
        const post = new Post()
        post.userName = newPost.userName
        post.postQuestion = newPost.postQuestion
        post.postStatus = 'Approved'
        return await postRepository.save(post)
      }
    } else {
      return { error: 'Please log in to the system' }
    }
  } catch (err) {
    return { error: 'Post not added' }
  }
}

export const changePostStatusService = async (postId: number, body: PostType) => {
  try {
    const findPost = await postRepository.findOneBy({ postId: postId })
    if (findPost) {
      postRepository.merge(findPost, body)
      return await postRepository.save(findPost)
    } else {
      return { error: 'Cannot find user' }
    }
  } catch (err) {
    return { error: 'Status not changed' }
  }
}

export const addFeedbackService = async (postId: number, body: PostType) => {
  try {
    const findPost = await postRepository.findOneBy({ postId: postId })
    if (findPost && findPost.postStatus === 'Rejected') {
      postRepository.merge(findPost, body)
      const result = await postRepository.save(findPost)
      return result
    } else {
      return { error: 'Cannot find post' }
    }
  } catch (err) {
    return { error: 'Feedback not added' }
  }
}

export const deletePostService = async (postId: number, accessToken: string) => {
  try {
    const findPost = await postRepository.findOneBy({ postId: postId })
    if (findPost) {
      const postUserName = findPost.userName
      const loggedUser = Jwt.verify(accessToken, config.jwt_secret_key) as JwtPayload
      if (loggedUser) {
        const findUser = await userRepository.findOneBy({ email: loggedUser.email })
        if (findUser.userName === postUserName) {
          const deletePost = await postRepository.delete(postId)
          const comments = await commentRepository.findBy({ postId: postId })
          if (comments) {
            const deleteComments = await commentRepository.delete({ postId: postId })
            return { deletePost, deleteComments }
          } else {
            return { error: 'Cannot find comments' }
          }
        } else {
          return { error: 'You connot delete post' }
        }
      } else {
        return { error: 'User not found' }
      }
    } else {
      return { error: 'Post not found' }
    }
  } catch (err) {
    return { error: 'Error in delete post' }
  }
}
