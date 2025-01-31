import { TUserRegister } from '@/@types/TUser'
import { TCreateUserCompany } from '@/@types/TUserCompany'
import { services } from '@/config/services'
import { ICreateCollaboratorDTO } from '@/dtos/collaborator'
import { IGetInfoUserDTO } from '@/dtos/user'
import { IRequestGtSearchCollectorsToCompany } from '@/interfaces/collaborator/request'
import { ICollaboratorRepository } from '@/shared/repositories/collaborator/ICollaboratorRepository'
import { NotFoundError } from '@/utils/exceptions/NotFoundError'
import { hydrateGetListCollectores } from '@/utils/hydrates/collaborator/hydrateGetListCollectores'
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

  async getSearchCollectorsToCompany({
    page,
    perPage,
    ordernation,
    search,
  }: IRequestGtSearchCollectorsToCompany) {
    const offset = (page - 1) * perPage

    const list = await this.collaboratorRepository.getSearchCollectorsToCompany(
      {
        offset,
        perPage,
        ordernation,
        search,
      },
    )

    const totalRows =
      await this.collaboratorRepository.getTotalRowsSearchCollectorsToCompany(
        search,
      )

    const listHydrated = hydrateGetListCollectores(list)
    const maxPage = Math.ceil(totalRows / perPage)

    return {
      collectors: listHydrated,
      rows: list.length,
      maxPage,
      totalRows,
    }
  }

  // Criar Rota Get Info Profile Usuário

  async getGetInfoUserById(id: number) {
    const data = await this.collaboratorRepository.getGetInfoUserById(id)

    if (!data) {
      throw new NotFoundError('Usuário não encontrado!')
    }

    const user: IGetInfoUserDTO = {
      id: data.id,
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      description: data.description,
      dateOfBirth: data.DateOfBirth,
      address: data.DateOfBirth.length > 0 ? data.address[0] : null,
      urlImage:
        data.profileImage.length > 0
          ? `${services.url}/imagens/${data.profileImage[0].url}`
          : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
    }

    return {
      user,
    }
  }
}
