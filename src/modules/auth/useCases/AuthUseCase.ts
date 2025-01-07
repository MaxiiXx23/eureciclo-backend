import { PrismaAuthRepository } from '@/shared/repositories/auth/prisma/PrismaAuthRepository'
import { AuthService } from '../services/AuthService'
import { TAuthCredentials, TLogout } from '@/@types/TUserAuth'
import { TUserRegister } from '@/@types/TUser'
import { CollaboratorUseCase } from '@/modules/collaborator/useCase/CollaboratorUseCase'
import { ICreateUserAndCompany } from '@/interfaces/auth'
import { CompanyUseCase } from '@/modules/company/useCases/CompanyUseCase'
import { SubcriptionUseCase } from '@/modules/subscription/useCases/SubscriptionUseCase'

export class AuthUseCase {
  private authService: AuthService
  private collaboratorUseCase: CollaboratorUseCase
  private companyUseCase: CompanyUseCase
  private subcriptionUseCase: SubcriptionUseCase

  constructor() {
    this.authService = new AuthService(new PrismaAuthRepository())
    this.collaboratorUseCase = new CollaboratorUseCase()
    this.companyUseCase = new CompanyUseCase()
    this.subcriptionUseCase = new SubcriptionUseCase()
  }

  async auth(credentials: TAuthCredentials) {
    return await this.authService.auth(credentials)
  }

  async logout(refreshToken: TLogout['refreshToken']) {
    await this.authService.logout(refreshToken)
  }

  async register(payload: TUserRegister) {
    return await this.authService.register(payload)
  }

  async registerUserAndCompany(payload: ICreateUserAndCompany) {
    const company = await this.companyUseCase.create(payload.company)

    await this.subcriptionUseCase.create({
      companyId: company.companyCreated.id,
      planId: 1,
    })

    const user = await this.authService.register(payload.user)

    await this.collaboratorUseCase.create({
      admin: true,
      companyId: company.companyCreated.id,
      userId: user.userCreated.id,
    })
  }
}
