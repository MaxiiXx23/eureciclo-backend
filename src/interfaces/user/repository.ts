export interface IGetInfoUser {
  id: number
  email: string
  firstName: string
  lastName: string
  description: string
  phone: string | null
  DateOfBirth: string
  rating: number
  profileImage: {
    id: number
    url: string
  }[]
  address: {
    id: number
    cep: string
    street: string
    number: string
    complement: string | null
    district: string
    city: string
    state: string
    country: string
  }[]
}

export interface IUpdateInfoNameUser {
  id: number
  firstName: string
  lastName: string
}

export interface IPatchInfoPhoneUser {
  id: number
  phone: string
}

export interface TCreateImageProfile {
  url: string
  size: number
  type: string
  userId?: number
  companyId?: number
}

export interface TUpdateImageProfile {
  id: number
  url: string
  size: number
  type: string
}
