import { PrismaCollaboratorRepository } from '@/shared/repositories/collaborator/prisma/PrismaCollaboratorRepository'
import { CollaboratorService } from '../services/CollaboratorService'
import { TCreateUserCompany } from '@/@types/TUserCompany'
import { TUserRegister } from '@/@types/TUser'
import { IRequestGtSearchCollectorsToCompany } from '@/interfaces/collaborator/request'

export class CollaboratorUseCase {
  private collaboratorUseService: CollaboratorService
  constructor() {
    this.collaboratorUseService = new CollaboratorService(
      new PrismaCollaboratorRepository(),
    )
  }

  async create(data: TCreateUserCompany) {
    return await this.collaboratorUseService.create(data)
  }

  async register(data: TUserRegister) {
    return await this.collaboratorUseService.register(data)
  }

  async getSearchCollectorsToCompany(
    data: IRequestGtSearchCollectorsToCompany,
  ) {
    return await this.collaboratorUseService.getSearchCollectorsToCompany(data)
  }

  async getGetInfoUserById(id: number) {
    return await this.collaboratorUseService.getGetInfoUserById(id)
  }
}
