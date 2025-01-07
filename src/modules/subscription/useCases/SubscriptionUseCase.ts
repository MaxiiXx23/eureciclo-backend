import { PrismaSubscriptionRepository } from '@/shared/repositories/SubscriptionRepository/prisma/PrismaSubscriptionRepository'
import { SubcriptionService } from '../services/SubscriptionService'
import { TRequestCreateSubscription } from '@/@types/TSubscription'
import { ISubscriptionDTO } from '@/dtos/subscription'

export class SubcriptionUseCase {
  private subcriptionService: SubcriptionService

  constructor() {
    this.subcriptionService = new SubcriptionService(
      new PrismaSubscriptionRepository(),
    )
  }

  async create(data: TRequestCreateSubscription): Promise<ISubscriptionDTO> {
    return await this.subcriptionService.create(data)
  }
}
