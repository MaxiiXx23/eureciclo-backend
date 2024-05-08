import { TUserRegister } from '@/@types/TUser'
import { TCreateUserCompany } from '@/@types/TUserCompany'
import { ICreateCollaboratorDTO } from '@/dtos/collaborator'
import { ICollaboratorRepository } from '@/shared/repositories/collaborator/ICollaboratorRepository'
import { hash } from 'bcrypt'

export class CollaboratorService {
  constructor(private collaboratorRepository: ICollaboratorRepository) {}

  async create(data: TCreateUserCompany) {
    const collaboratorCreated = await this.collaboratorRepository.create(data)

    return {
      collaboratorCreated,
    }
  }

  async register({
    email,
    DateOfBirth,
    docIdentification,
    fullName,
    password,
    phone,
    typeUserId,
  }: TUserRegister) {
    const hasAlreadyUser =
      await this.collaboratorRepository.getUserByEmail(email)

    if (hasAlreadyUser) {
      throw new Error('Erro ao utilizar este e-mail, pois, já está em uso.')
    }

    const typeUser =
      await this.collaboratorRepository.getTypeUserById(typeUserId)

    if (!typeUser) {
      throw new Error('Tipo de usuário não encontrado.')
    }

    const passwordHashed = await hash(password, 6)
    const nameSplited = fullName.split(' ')
    const firstName = nameSplited[0]
    const lastName = nameSplited[nameSplited.length - 1]

    const userCreated = await this.collaboratorRepository.createCollaborator({
      email,
      DateOfBirth,
      docIdentification,
      fullName,
      firstName,
      lastName,
      password: passwordHashed,
      phone,
      typeUserId,
    })

    const userMapped: ICreateCollaboratorDTO = {
      id: userCreated.id,
      email: userCreated.email,
      fullName: userCreated.fullName,
      phone: userCreated.phone,
      status: userCreated.status,
      typeUser: {
        id: typeUser.id,
        type: typeUser.type,
      },
    }

    return {
      userCreated: userMapped,
    }
  }
}
