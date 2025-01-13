import { prismaProvider } from '@/shared/providers'

import { TCreateAddress, TAddress, TUpdateAddress } from '@/@types/TAddress'
import { IAddressRepository } from '../IAddressRepository'

export class PrismaAddressRepository implements IAddressRepository {
  async create(data: TCreateAddress): Promise<TAddress> {
    const address = await prismaProvider.queryDatabase((prisma) =>
      prisma.address.create({
        data,
      }),
    )

    return address
  }

  async update(data: TUpdateAddress): Promise<TAddress> {
    const address = await prismaProvider.queryDatabase((prisma) =>
      prisma.address.update({
        where: {
          id: data.id,
        },
        data,
      }),
    )

    return address
  }

  async getByUserId(id: number): Promise<TAddress | null> {
    const address = await prismaProvider.queryDatabase((prisma) =>
      prisma.address.findFirst({
        where: {
          userId: id,
        },
      }),
    )

    return address
  }

  async getByCompanyId(id: number): Promise<TAddress | null> {
    const address = await prismaProvider.queryDatabase((prisma) =>
      prisma.address.findFirst({
        where: {
          companyId: id,
        },
      }),
    )

    return address
  }
}
