export interface TCollect {
  id: number
  description: string
  code: string
  collectedAt: Date | null
  receivedAt: Date | null
  userId: number
  addressId: number
  statusCollectId: number
  createdAt: Date
  updatedAt: Date
}

export interface TCreateCollect {
  description: string
  code: string
  userId: number
  addressId: number
  statusCollectId: number
}

export interface TPatchInProcessCollectById {
  id: number
  statusCollectId: number
}
