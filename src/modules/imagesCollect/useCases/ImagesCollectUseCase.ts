import { ImagesCollectService } from '../services/ImagesCollectService'
import { PrismaImagesCollectRepository } from '@/shared/repositories/imagesCollect/prisma/PrismaImagesCollectRepository'

import { IRequestCreateImagesCollect } from '@/interfaces/imagesCollect'

export class ImagesCollectUseCase {
  private imagesCollectService: ImagesCollectService

  constructor() {
    this.imagesCollectService = new ImagesCollectService(
      new PrismaImagesCollectRepository(),
    )
  }

  async create(data: IRequestCreateImagesCollect) {
    return await this.imagesCollectService.create(data)
  }
}
