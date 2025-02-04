import dayjs from 'dayjs'

import {
  TCreateSubscription,
  TRequestCreateSubscription,
} from '@/@types/TSubscription'
import { ISubscriptionDTO } from '@/dtos/subscription'
import { ISubscriptionRepository } from '@/shared/repositories/SubscriptionRepository/ISubscriptionRepository'

export class SubcriptionService {
  constructor(private subscriptionRepository: ISubscriptionRepository) {}

  async create(req: TRequestCreateSubscription): Promise<ISubscriptionDTO> {
    const data: TCreateSubscription = {
      companyId: req.companyId,
      planId: req.planId,
      startDate: new Date(),
      endDate: dayjs().add(30, 'day').toDate(),
      statusSubscriptionId: 1,
    }

    const subscription = await this.subscriptionRepository.create(data)
    return {
      subscription,
    }
  }
}
