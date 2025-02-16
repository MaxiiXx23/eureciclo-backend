import { IPagination } from '../globals'

interface ICreatePost {
  title: string
  description: string
  type: number
  likes: number
  userId: number
  companyId?: number
}

interface IGetPostsByType extends Omit<IPagination, 'status'> {
  type: number
}

export { ICreatePost, IGetPostsByType }
