import { TAddress } from '@/@types/TAddress'
import { IOccupationAreaDTO } from '../occupationArea'

interface IUpdateInfoCompanyDTO {
  id: number
  description: string | null
  ocupationArea: IOccupationAreaDTO
}

interface IInfoProfileCompanyDTO {
  id: number
  docIdentification: string
  fantasyName: string
  phone: string | null
  email: string | null
  description: string | null
  address: Omit<TAddress, 'userId' | 'companyId'> | null
}

export { IUpdateInfoCompanyDTO, IInfoProfileCompanyDTO }
