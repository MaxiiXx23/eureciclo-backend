import { TCreateSubscription, TSubscription } from '@/@types/TSubscription'
import { ISubscriptionRepository } from '../ISubscriptionRepository'

import { prismaProvider } from '@/shared/providers'

export class PrismaSubscriptionRepository implements ISubscriptionRepository {
  async create(data: TCreateSubscription): Promise<TSubscription> {
    const subscription = await prismaProvider.queryDatabase((prisma) =>
      prisma.subscription.create({
        data,
      }),
    )

    return subscription
  }
}
