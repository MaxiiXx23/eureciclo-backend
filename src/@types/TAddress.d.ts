export interface TAddress {
  id: number
  cep: string
  street: string
  number: string
  complement: string | null
  district: string
  city: string
  state: string
  country: string
  userId: number | null
  companyId: number | null
}

export interface TCreateAddress {
  cep: string
  street: string
  number: string
  complement: string | null
  district: string
  city: string
  state: string
  country: string
  userId?: number
  companyId?: number
}

export interface TUpdateAddress {
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
