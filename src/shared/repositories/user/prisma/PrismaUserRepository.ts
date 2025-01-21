import { prismaProvider } from '@/shared/providers'

import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'
import { IUserRepository } from '../IUserRepository'

export class PrismaUserRepository implements IUserRepository {
  async updateName(data: IUpdateInfoNameUser): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      }),
    )
  }

  async updatePhone(data: IPatchInfoPhoneUser): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.user.update({
        where: {
          id: data.id,
        },
        data,
      }),
    )
  }
}
