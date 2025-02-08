import { TAddress } from '@/@types/TAddress'

interface IUpdateInfoCompanyDTO {
  id: number
  description: string
  corporateReason: string
  fantasyName: string
  phone: string
  email: string
}

interface IInfoProfileCompanyDTO {
  id: number
  docIdentification: string
  corporateReason: string
  fantasyName: string
  phone: string
  email: string
  description: string
  urlImage: string
  address: Omit<TAddress, 'userId' | 'companyId'> | null
}

interface IGetItemListCompaniesDTO {
  id: number
  name: string
  rating: number
  urlImage: string
}

export {
  IUpdateInfoCompanyDTO,
  IInfoProfileCompanyDTO,
  IGetItemListCompaniesDTO,
}
