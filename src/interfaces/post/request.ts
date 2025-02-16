import { IRequestPagination } from '../globals'

interface ICreatePost {
  title: string
  description: string
  type: number
  likes: number
  userId: number
  companyId?: number
}

interface IRequestCreatePost {
  post: ICreatePost
  file: Express.Multer.File
}

interface IRequestGetPostByType
  extends Omit<IRequestPagination, 'status' | 'type'> {
  type: number
}

export { ICreatePost, IRequestCreatePost, IRequestGetPostByType }
