import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { IAuthRepository } from '../IAuthRepository'
import { prismaProvider } from '@/shared/providers'
import { TRefreshToken } from '@/@types/TUserAuth'

export class PrismaAuthRepository implements IAuthRepository {
  async createUser({
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

  async getUserById(id: number): Promise<TUser | null> {
    const user = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.findUnique({
        where: {
          id,
        },
      }),
    )

    return user
  }

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

  async findRefreshToken(token: string): Promise<TRefreshToken | null> {
    const refreshToken = await prismaProvider.queryDatabase((prisma) =>
      prisma.refreshToken.findFirst({
        where: {
          token,
        },
      }),
    )
    return refreshToken
  }

  async deleteRefreshToken(id: number): Promise<TRefreshToken> {
    const deletedRefreshToken = await prismaProvider.queryDatabase((prisma) =>
      prisma.refreshToken.delete({
        where: {
          id,
        },
      }),
    )

    return deletedRefreshToken
  }
}
