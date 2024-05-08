import {
  TCompany,
  TCreateCompany,
  TUpdateInfosCompany,
} from '@/@types/TCompany'
import { ICompanyRepository } from '../ICompanyRepository'
import { prismaProvider } from '@/shared/providers'
import { TOccupationArea } from '@/@types/TOccupationArea'

export class PrismaCompanyRepository implements ICompanyRepository {
  async getInfoProfileCompanyById(id: number): Promise<TCompany | null> {
    const infoCompany = await prismaProvider.queryDatabase((prisma) =>
      prisma.company.findUnique({
        where: {
          id,
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
}
