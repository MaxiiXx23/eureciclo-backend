import { PrismaCollectRepository } from '@/shared/repositories/collect/prisma/PrismaCollectRepository'
import { CollectService } from '../services/CollectService'
import { IRequestCreateCollect } from '@/interfaces/collect/request'
import { PrismaImagesCollectRepository } from '@/shared/repositories/imagesCollect/prisma/PrismaImagesCollectRepository'
import { ImagesCollectService } from '@/modules/imagesCollect/services/ImagesCollectService'

export class CollectUseCase {
  private collectService: CollectService
  private imagesCollectService: ImagesCollectService

  constructor() {
    this.collectService = new CollectService(new PrismaCollectRepository())
    this.imagesCollectService = new ImagesCollectService(
      new PrismaImagesCollectRepository(),
    )
  }

  async create(data: IRequestCreateCollect) {
    const { collectCreated } = await this.collectService.create(data)

    await this.imagesCollectService.create({
      collectId: collectCreated.id,
      file: data.file,
    })
  }
}
