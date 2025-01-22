import { prismaProvider } from '@/shared/providers'

import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
  TCreateImageProfile,
  TUpdateImageProfile,
} from '@/interfaces/user/repository'
import { IUserRepository } from '../IUserRepository'
import { TProfileImage } from '@/@types/TProfileImage'

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

  async getImageProfileByUser(id: number): Promise<TProfileImage | null> {
    const data = await prismaProvider.queryDatabase((prisma) =>
      prisma.profileImage.findFirst({
        where: {
          userId: id,
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
