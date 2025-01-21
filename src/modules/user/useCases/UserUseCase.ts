import { UserService } from '../services/UserService'
import { PrismaUserRepository } from '@/shared/repositories/user/prisma/PrismaUserRepository'
import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'

export class UserUseCase {
  private userService: UserService

  constructor() {
    this.userService = new UserService(new PrismaUserRepository())
  }

  async updateName(data: IUpdateInfoNameUser) {
    await this.userService.updateName(data)
  }

  async patchPhone(data: IPatchInfoPhoneUser) {
    await this.userService.patchPhone(data)
  }
}
