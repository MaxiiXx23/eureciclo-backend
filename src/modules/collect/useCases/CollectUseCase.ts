import { PrismaCollectRepository } from '@/shared/repositories/collect/prisma/PrismaCollectRepository'
import { CollectService } from '../services/CollectService'
import { IRequestCreateCollect } from '@/interfaces/collect/request'

export class CollectUseCase {
  private collectService: CollectService

  constructor() {
    this.collectService = new CollectService(new PrismaCollectRepository())
  }

  async create(data: IRequestCreateCollect) {
    return await this.collectService.create(data)
  }
}
