import { TCreateUserCompany, TUserCompany } from '@/@types/TUserCompany'
import { ICollaboratorRepository } from '../ICollaboratorRepository'
import { prismaProvider } from '@/shared/providers'
import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { TTypeUser } from '@/@types/TTypeUser'

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
}
