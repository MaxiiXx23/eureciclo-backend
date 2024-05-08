import { PrismaAuthRepository } from '@/shared/repositories/auth/prisma/PrismaAuthRepository'
import { AuthService } from '../services/AuthService'
import { TAuthCredentials, TLogout } from '@/@types/TUserAuth'
import { TUserRegister } from '@/@types/TUser'
import { CollaboratorUseCase } from '@/modules/collaborator/useCase/CollaboratorUseCase'

export class AuthUseCase {
  private authService: AuthService
  private collaboratorUseCase: CollaboratorUseCase

  constructor() {
    this.authService = new AuthService(new PrismaAuthRepository())
    this.collaboratorUseCase = new CollaboratorUseCase()
  }

  async auth(credentials: TAuthCredentials) {
    return await this.authService.auth(credentials)
  }

  async logout(refreshToken: TLogout['refreshToken']) {
    await this.authService.logout(refreshToken)
  }

  async register(payload: TUserRegister) {
    const data = await this.authService.register(payload)
    if (!payload.companyId) {
      return data
    }

    await this.collaboratorUseCase.create({
      admin: true,
      companyId: payload.companyId,
      userId: data.userCreated.id,
    })

    return data
  }
}
