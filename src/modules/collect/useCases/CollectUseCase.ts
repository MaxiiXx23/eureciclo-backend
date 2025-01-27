import { PrismaCollectRepository } from '@/shared/repositories/collect/prisma/PrismaCollectRepository'
import { CollectService } from '../services/CollectService'
import {
  IRequestCreateCollect,
  IRequestCreateInProgressByCollector,
  IRequestGetCollectsByCollector,
  IRequestGetCollectsByUser,
  IRequestGetCollectsInProcessByCollector,
} from '@/interfaces/collect/request'
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

  async patchConfirmCollect(id: number, code: string) {
    await this.collectService.patchConfirmCollect(id, code)
  }

  async getCollectById(id: number) {
    return await this.collectService.getCollectById(id)
  }

  async getInProgressByUserId(id: number) {
    return await this.collectService.getInProgressByUserId(id)
  }

  async getCollectsByUser(data: IRequestGetCollectsByUser) {
    return await this.collectService.getCollectsByUser(data)
  }

  async getCollectsToCollector(data: IRequestGetCollectsByCollector) {
    return await this.collectService.getCollectsToCollector(data)
  }

  async getCollectsInProcessByCollector(
    data: IRequestGetCollectsInProcessByCollector,
  ) {
    return await this.collectService.getCollectsInProcessByCollector(data)
  }

  async createInProgressByCollector(data: IRequestCreateInProgressByCollector) {
    return await this.collectService.createInProgressByCollector(data)
  }
}
