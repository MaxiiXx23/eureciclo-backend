import { prismaProvider } from '@/shared/providers'

import { TCollect, TCreateCollect } from '@/@types/TCollect'
import { ICollectRepository } from '../ICollectRepository'
import { IGetInfoCollect, IGetListCollectsByUser } from '@/interfaces/collect'

import { IGetCollectsByUser } from '@/interfaces/collect/repository'

export class PrismaCollectRepository implements ICollectRepository {
  async create(data: TCreateCollect): Promise<TCollect> {
    const collect = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.create({
        data,
      }),
    )

    return collect
  }

  async getById(id: number): Promise<IGetInfoCollect | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          code: true,
          description: true,
          receivedAt: true,
          collectedAt: true,
          createdAt: true,
          statusCollect: {
            select: {
              id: true,
              name: true,
              color: true,
            },
          },
          ImagesCollect: {
            select: {
              id: true,
              url: true,
            },
          },
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          addresses: {
            select: {
              id: true,
              cep: true,
              street: true,
              number: true,
              complement: true,
              district: true,
              city: true,
              state: true,
              country: true,
            },
          },
        },
      }),
    )

    return data
  }

  async getCollectsByUser({
    id,
    offset,
    perPage,
    status,
    ordernation,
    search,
  }: IGetCollectsByUser): Promise<IGetListCollectsByUser[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findMany({
        where: {
          userId: id,
          statusCollectId: status,
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
        select: {
          id: true,
          createdAt: true,
          statusCollect: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: ordernation,
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsCollectsByUser(
    id: number,
    status: number,
    search?: string,
  ): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.count({
        where: {
          userId: id,
          statusCollectId: status,
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
            ],
          }),
        },
      }),
    )

    return totalRows
  }
}
