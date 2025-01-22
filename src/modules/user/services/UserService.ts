import path from 'path'
import fs from 'fs'

import { tmpFolder } from '@/config/uploadImages'

import { IUserRepository } from '@/shared/repositories/user/IUserRepository'

import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'
import { IRequestUploadImageProfile } from '@/interfaces/user/request'
import { services } from '@/config/services'

export class UserService {
  constructor(private userRepository: IUserRepository) {}

  async updateName(data: IUpdateInfoNameUser) {
    await this.userRepository.updateName(data)
  }

  async patchPhone(data: IPatchInfoPhoneUser) {
    await this.userRepository.updatePhone(data)
  }

  async uploadImageProfileUser({ id, file }: IRequestUploadImageProfile) {
    const key = `${file.filename}`

    const hasImageProfile = await this.userRepository.getImageProfileByUser(id)

    if (hasImageProfile) {
      await this.userRepository.updateUploadImageProfile({
        id: hasImageProfile.id,
        url: key,
        size: file.size,
        type: file.mimetype,
      })

      const originalPath = path.resolve(tmpFolder, hasImageProfile.url)

      await fs.promises.unlink(originalPath)

      await this.userRepository.deleteImageProfile(hasImageProfile.id)
    }

    await this.userRepository.createUploadImageProfile({
      url: key,
      size: file.size,
      type: file.mimetype,
      userId: id,
    })

    return {
      urlImage: `${services.url}/imagens/${key}`,
    }
  }
}
