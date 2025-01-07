interface TSubscription {
  id: number
  startDate: Date
  endDate: Date
  statusSubscriptionId: number
  companyId: number
  planId: number
  createdAt: Date
  updatedAt: Date
}

interface TCreateSubscription {
  startDate: Date
  endDate: Date
  statusSubscriptionId: number
  companyId: number
  planId: number
}

type TRequestCreateSubscription = Pick<TSubscription, 'companyId' | 'planId'>

export { TSubscription, TCreateSubscription, TRequestCreateSubscription }
