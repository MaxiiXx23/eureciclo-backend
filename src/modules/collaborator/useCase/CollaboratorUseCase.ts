import { PrismaCollaboratorRepository } from '@/shared/repositories/collaborator/prisma/PrismaCollaboratorRepository'
import { CollaboratorService } from '../services/CollaboratorService'
import { TCreateUserCompany } from '@/@types/TUserCompany'
import { TUserRegister } from '@/@types/TUser'

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
}
