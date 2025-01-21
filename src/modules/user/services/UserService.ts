import { IUserRepository } from '@/shared/repositories/user/IUserRepository'
import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async updateName(data: IUpdateInfoNameUser) {
    await this.userRepository.updateName(data)
  }

  async patchPhone(data: IPatchInfoPhoneUser) {
    await this.userRepository.updatePhone(data)
  }
}
