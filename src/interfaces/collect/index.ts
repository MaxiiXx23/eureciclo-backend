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
    complement: string
    district: string
    city: string
    state: string
    country: string
  }
}

export interface IGetListCollectsByUser {
  id: number
  createdAt: Date
  statusCollect: {
    id: number
    name: string
  }
}
