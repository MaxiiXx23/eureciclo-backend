import { ICreatePost, IGetPostsByType } from '@/interfaces/post/repository'
import { IPostRepository } from '../IPostRepository'
import { prismaProvider } from '@/shared/providers'
import { IGetItemPost, TGetPost, TPost } from '@/@types/Post'
import { TCreateFilesPost, TFilesPost } from '@/@types/FilesPost'

export class PrismaPostRepository implements IPostRepository {
  async create(data: ICreatePost): Promise<TPost> {
    const dataCreated = await prismaProvider.queryDatabase((prisma) =>
      prisma.post.create({
        data,
      }),
    )

    return dataCreated
  }

  async createFilePost(data: TCreateFilesPost): Promise<TFilesPost> {
    const file = await prismaProvider.queryDatabase((prisma) =>
      prisma.filesPost.create({
        data,
      }),
    )

    return file
  }

  async getPostById(id: number): Promise<TGetPost | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.post.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          createdAt: true,
          FilesPost: {
            select: {
              id: true,
              url: true,
            },
          },
        },
      }),
    )

    return data
  }

  async getPostsByType({
    offset,
    perPage,
    type,
  }: IGetPostsByType): Promise<IGetItemPost[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.post.findMany({
        where: {
          type,
        },
        select: {
          id: true,
          title: true,
          FilesPost: {
            select: {
              id: true,
              url: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsPostsByType(type: number): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.post.count({
        where: {
          type,
        },
      }),
    )

    return totalRows
  }
}
