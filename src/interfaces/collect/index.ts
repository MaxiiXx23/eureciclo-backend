export interface IGetInfoCollect {
  id: number
  description: string
  code: string
  collectedAt: Date | null
  receivedAt: Date | null
  createdAt: Date
  user: {
    id: number
    firstName: string
    lastName: string
    rating: number
  }
  statusCollect: {
    id: number
    name: string
    color: string
  }
  ImagesCollect: {
    id: number
    url: string
  }[]
  addresses: {
    id: number
    cep: string
    street: string
    number: string
    complement: string | null
    district: string
    city: string
    state: string
    country: string
  }
  CollectBy: {
    collector: {
      id: number
      firstName: string
      lastName: string
      rating: number
      createdAt: Date
    } | null
  }[]
}

export interface IGetListCollectsByUser {
  id: number
  createdAt: Date
  statusCollect: {
    id: number
    name: string
  }
}
