import {
  IRequestCreatePost,
  IRequestGetPostByType,
} from '@/interfaces/post/request'
import { IPostRepository } from '@/shared/repositories/post/IPostRepository'

import { hydrateGetListPosts } from '@/utils/hydrates/post/hydrateGetListPosts'
import { mapperPost } from '../mappers/mapperPost'
import { NotFoundError } from '@/utils/exceptions/NotFoundError'

export class PostService {
  constructor(private postRepository: IPostRepository) {}

  async create(data: IRequestCreatePost) {
    const post = await this.postRepository.create(data.post)

    const key = `${data.file.filename}`

    await this.postRepository.createFilePost({
      url: key,
      size: data.file.size,
      type: data.file.mimetype,
      postId: post.id,
    })

    return {
      post,
    }
  }

  async getPostsByType({ page, perPage, type }: IRequestGetPostByType) {
    const offset = (page - 1) * perPage

    const list = await this.postRepository.getPostsByType({
      offset,
      perPage,
      type,
    })

    const totalRows = await this.postRepository.getTotalRowsPostsByType(type)

    const hydrated = hydrateGetListPosts(list)

    const maxPage = Math.ceil(totalRows / perPage)

    return {
      posts: hydrated,
      rows: hydrated.length,
      maxPage,
      totalRows,
    }
  }

  async getPostById(id: number) {
    const data = await this.postRepository.getPostById(id)

    if (!data) {
      throw new NotFoundError('Postagem não encontrada!')
    }

    const post = mapperPost(data)

    return {
      post,
    }
  }
}
