export interface IGetInfoCollectDTO {
  id: number
  description: string
  code: string
  collectedAt: string | null
  receivedAt: string | null
  createdAt: string
  user: {
    id: number
    name: string
  }
  status: {
    id: number
    name: string
    color: string
  }
  image: {
    id: number
    url: string
  }
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

export interface IGetListCollectsByUserDTO {
  id: number
  createdAt: string
  status: {
    id: number
    name: string
  }
}
