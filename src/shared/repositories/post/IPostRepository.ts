import { TCreateFilesPost, TFilesPost } from '@/@types/FilesPost'
import { IGetItemPost, TGetPost, TPost } from '@/@types/Post'
import { ICreatePost, IGetPostsByType } from '@/interfaces/post/repository'

export interface IPostRepository {
  create(data: ICreatePost): Promise<TPost>
  createFilePost(data: TCreateFilesPost): Promise<TFilesPost>

  getPostsByType(data: IGetPostsByType): Promise<IGetItemPost[]>
  getTotalRowsPostsByType(type: number): Promise<number>

  getPostById(id: number): Promise<TGetPost | null>
}
