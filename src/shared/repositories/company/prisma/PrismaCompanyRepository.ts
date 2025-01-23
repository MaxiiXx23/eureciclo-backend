import {
  IGetInfoCompany,
  TCompany,
  TCreateCompany,
  TItemListCompany,
  TUpdateInfosCompany,
} from '@/@types/TCompany'
import { ICompanyRepository } from '../ICompanyRepository'
import { prismaProvider } from '@/shared/providers'
import { TOccupationArea } from '@/@types/TOccupationArea'
import { IGetSearchCompaniesToCollector } from '@/interfaces/company/repository'
import {
  TCreateImageProfile,
  TUpdateImageProfile,
} from '@/interfaces/user/repository'
import { TProfileImage } from '@/@types/TProfileImage'

export class PrismaCompanyRepository implements ICompanyRepository {
  async getInfoProfileCompanyById(id: number): Promise<IGetInfoCompany | null> {
    const infoCompany = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.findUnique({
        where: {
          id,
        },
        select: {
          id: true,
          docIdentification: true,
          fantasyName: true,
          corporateReason: true,
          phone: true,
          email: true,
          description: true,
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
          profileImage: {
            select: {
              id: true,
              url: true,
              size: true,
              type: true,
              userId: true,
              companyId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      }),
    )

    return infoCompany
  }

  async getCompanyById(id: number): Promise<TCompany | null> {
    const company = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.findUnique({
        where: {
          id,
        },
      }),
    )

    return company
  }

  async getCompanyByDocIdentification(
    docIdentification: string,
  ): Promise<TCompany | null> {
    const company = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.findFirst({
        where: {
          docIdentification,
        },
      }),
    )

    return company
  }

  async create(data: TCreateCompany): Promise<TCompany> {
    const companyCreated = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.create({
        data,
      }),
    )

    return companyCreated
  }

  async updateInfos(data: TUpdateInfosCompany): Promise<TCompany> {
    const companyUpdated = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.update({
        where: {
          id: data.id,
        },
        data,
      }),
    )

    return companyUpdated
  }

  async getOccupationAreaById(id: number): Promise<TOccupationArea | null> {
    const occupationArea = await prismaProvider.queryDatabase((prisma) =>
      prisma.occupationArea.findUnique({
        where: {
          id,
        },
      }),
    )

    return occupationArea
  }

  async getSearchCompaniesToCollector({
    offset,
    perPage,
    // ordernation,
    search,
  }: IGetSearchCompaniesToCollector): Promise<TItemListCompany[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.findMany({
        where: {
          ...(search && {
            OR: [
              {
                fantasyName: {
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
            ],
          }),
        },
        select: {
          id: true,
          fantasyName: true,
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

  async getTotalRowsSearchCompaniesToCollector(
    search?: string,
  ): Promise<number> {
    const totalRows = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.count({
        where: {
          ...(search && {
            OR: [
              {
                fantasyName: {
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
            ],
          }),
        },
      }),
    )

    return totalRows
  }

  async getImageProfileByCompany(id: number): Promise<TProfileImage | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.profileImage.findFirst({
        where: {
          companyId: id,
        },
      }),
    )

    return data
  }

  async createUploadImageProfile(data: TCreateImageProfile): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.profileImage.create({
        data,
      }),
    )
  }

  async updateUploadImageProfile({
    id,
    size,
    type,
    url,
  }: TUpdateImageProfile): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.profileImage.update({
        where: {
          id,
        },
        data: {
          size,
          type,
          url,
        },
      }),
    )
  }

  async deleteImageProfile(id: number): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.profileImage.delete({
        where: {
          id,
        },
      }),
    )
  }
}
