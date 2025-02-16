import { PrismaPostRepository } from '@/shared/repositories/post/prisma/PrismaPostRepository'
import { PostService } from '../services/PostService'
import {
  IRequestCreatePost,
  IRequestGetPostByType,
} from '@/interfaces/post/request'

export class PostUseCase {
  private postService: PostService

  constructor() {
    this.postService = new PostService(new PrismaPostRepository())
  }

  async create(data: IRequestCreatePost) {
    return await this.postService.create(data)
  }

  async getPostsByType(data: IRequestGetPostByType) {
    return await this.postService.getPostsByType(data)
  }

  async getPostById(id: number) {
    return await this.postService.getPostById(id)
  }
}
