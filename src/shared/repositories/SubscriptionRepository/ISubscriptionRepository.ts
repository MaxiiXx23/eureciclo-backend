import { TCreateSubscription, TSubscription } from '@/@types/TSubscription'

export interface ISubscriptionRepository {
  create(data: TCreateSubscription): Promise<TSubscription>
}
