import { TCreateUserCompany, TUserCompany } from '@/@types/TUserCompany'
import { ICollaboratorRepository } from '../ICollaboratorRepository'
import { prismaProvider } from '@/shared/providers'
import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { TTypeUser } from '@/@types/TTypeUser'
import { IGetSearchCollectorsToCompany } from '@/interfaces/collaborator/repository'
import { IGetItemListCollector } from '@/@types/TCollaborator'
import { IGetInfoUser } from '@/interfaces/user/repository'

export class PrismaCollaboratorRepository implements ICollaboratorRepository {
  async getUserByEmail(
    email: string,
  ): Promise<TUserWithFieldUserCompany | null> {
    const user = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.findFirst({
        where: {
          email,
        },
        include: {
          userCompany: true,
        },
      }),
    )

    return user
  }

  async getGetInfoUserById(id: number): Promise<IGetInfoUser | null> {
    const user = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.findUnique({
        where: {
          id,
          typeUserId: {
            in: [1, 2],
          },
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          description: true,
          DateOfBirth: true,
          email: true,
          phone: true,
          rating: true,
          profileImage: {
            select: {
              id: true,
              url: true,
            },
          },
          address: {
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

    return user
  }

  async createCollaborator({
    email,
    fullName,
    firstName,
    lastName,
    docIdentification,
    password,
    DateOfBirth,
    phone,
    typeUserId,
  }: TUserRegisterFinal): Promise<TUser> {
    const createdUser = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.create({
        data: {
          email,
          fullName,
          firstName,
          lastName,
          docIdentification,
          password,
          DateOfBirth,
          phone,
          description: '',
          typeUserId,
        },
      }),
    )

    return createdUser
  }

  async create(data: TCreateUserCompany): Promise<TUserCompany> {
    const collaboratorCreated = await prismaProvider.queryDatabase((prisma) =>
      prisma.userCompany.create({
        data,
      }),
    )

    return collaboratorCreated
  }

  async getTypeUserById(id: number): Promise<TTypeUser | null> {
    const typeUser = await prismaProvider.queryDatabase((prisma) =>
      prisma.typeUser.findUnique({
        where: {
          id,
        },
      }),
    )

    return typeUser
  }

  async getSearchCollectorsToCompany({
    offset,
    perPage,
    // ordernation,
    search,
  }: IGetSearchCollectorsToCompany): Promise<IGetItemListCollector[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.findMany({
        where: {
          typeUserId: 2,
          ...(search && {
            OR: [
              {
                fullName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                address: {
                  some: {
                    street: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    district: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    city: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    state: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
            ],
          }),
        },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          rating: true,
          profileImage: {
            select: {
              id: true,
              url: true,
            },
          },
        },
        orderBy: {
          firstName: 'asc',
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsSearchCollectorsToCompany(
    search?: string,
  ): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.count({
        where: {
          typeUserId: 2,
          ...(search && {
            OR: [
              {
                fullName: {
                  contains: search,
                  mode: 'insensitive',
                },
              },
              {
                address: {
                  some: {
                    street: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    district: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    city: {
                      contains: search,
                      mode: 'insensitive',
                    },
                  },
                },
              },
              {
                address: {
                  some: {
                    state: {
                      contains: search,
                      mode: 'insensitive',
                    },
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
