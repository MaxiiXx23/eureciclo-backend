import { IOccupationAreaDTO } from '../occupationArea'

interface IUpdateInfoCompanyDTO {
  id: number
  description: string
  ocupationArea: IOccupationAreaDTO
}

interface IInfoProfileCompanyDTO {
  id: number
  docIdentification: string
  fantasyName: string
  phone: string
  email: string
  description: string
}

export { IUpdateInfoCompanyDTO, IInfoProfileCompanyDTO }
