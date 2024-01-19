export interface AddPostType {
  userName: string
  postQuestion: string
}

export interface PostType {
  postId: number
  userName: string
  postQuestion: string
  postStatus: string
  postFeedback: string
  createdTime: Date
  updatedTime: Date
}
