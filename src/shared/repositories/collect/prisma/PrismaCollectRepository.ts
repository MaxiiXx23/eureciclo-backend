import { prismaProvider } from '@/shared/providers'

import {
  TCollect,
  TCreateCollect,
  TPatchInProcessCollectById,
} from '@/@types/TCollect'
import { ICollectRepository } from '../ICollectRepository'
import { IGetInfoCollect, IGetListCollectsByUser } from '@/interfaces/collect'

import {
  IGetCollectsByCollector,
  IGetCollectsByUser,
  IGetCollectsInProcessByCollector,
} from '@/interfaces/collect/repository'
import { IRequestCreateInProgressByCollector } from '@/interfaces/collect/request'

export class PrismaCollectRepository implements ICollectRepository {
  async create(data: TCreateCollect): Promise<TCollect> {
    const collect = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.create({
        data,
      }),
    )

    return collect
  }

  async pathConfirmCollect(id: number): Promise<TCollect | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.update({
        where: {
          id,
        },
        data: {
          statusCollectId: 1,
        },
      }),
    )

    return data
  }

  async getByIdAndCode(id: number, code: string): Promise<TCollect | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findFirst({
        where: {
          id,
          code,
          statusCollectId: 3,
        },
      }),
    )

    return data
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
          CollectBy: {
            select: {
              collector: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  createdAt: true,
                },
              },
            },
          },
        },
      }),
    )

    return data
  }

  async getInProgressByUserId(id: number): Promise<IGetInfoCollect | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findFirst({
        where: {
          userId: id,
          OR: [
            {
              statusCollectId: {
                in: [4, 3],
              },
            },
          ],
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
          CollectBy: {
            select: {
              collector: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  createdAt: true,
                },
              },
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
    // status,
    // ordernation,
    search,
  }: IGetCollectsByUser): Promise<IGetListCollectsByUser[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findMany({
        where: {
          userId: id,
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
          createdAt: 'desc',
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

  async getCollectsByCollector({
    offset,
    perPage,
    status,
    // ordernation,
    search,
  }: IGetCollectsByCollector): Promise<IGetListCollectsByUser[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findMany({
        where: {
          statusCollectId: {
            in: [...status],
          },
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                addresses: {
                  street: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                addresses: {
                  district: {
                    contains: search,
                    mode: 'insensitive',
                  },
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
          createdAt: 'desc',
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsCollectsByCollector(
    status: number[],
    search?: string,
  ): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.count({
        where: {
          statusCollectId: {
            in: [...status],
          },
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                addresses: {
                  street: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                addresses: {
                  district: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
            ],
          }),
        },
      }),
    )

    return totalRows
  }

  async createInProgressByCollector(
    data: IRequestCreateInProgressByCollector,
  ): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.collectBy.create({
        data: {
          collectId: data.id,
          collectorId: data.collectorId,
        },
      }),
    )
  }

  async patchStatusCollect({
    id,
    statusCollectId,
  }: TPatchInProcessCollectById): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.update({
        where: {
          id,
        },
        data: {
          statusCollectId,
        },
      }),
    )
  }

  async getCollectsInProcessByCollector({
    id,
    offset,
    perPage,
    status,
    // ordernation,
    search,
  }: IGetCollectsInProcessByCollector): Promise<IGetListCollectsByUser[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.findMany({
        where: {
          CollectBy: {
            some: {
              collectorId: id,
            },
          },
          statusCollectId: {
            in: [...status],
          },
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                addresses: {
                  street: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                addresses: {
                  district: {
                    contains: search,
                    mode: 'insensitive',
                  },
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
          createdAt: 'desc',
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsCollectsInProcessByCollector(
    id: number,
    status: number[],
    search?: string,
  ): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.count({
        where: {
          CollectBy: {
            some: {
              collectorId: id,
            },
          },
          statusCollectId: {
            in: [...status],
          },
          ...(search && {
            OR: [
              {
                code: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                addresses: {
                  street: {
                    contains: search,
                    mode: 'insensitive',
                  },
                },
              },
              {
                addresses: {
                  district: {
                    contains: search,
                    mode: 'insensitive',
                  },
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
