// import { Company } from '@prisma/client'

interface TCompany {
  id: number
  docIdentification: string
  fantasyName: string
  corporateReason: string
  phone: string
  email: string
  status: boolean
  type: number
  description: string
  occupationAreaId: number
  createdAt: Date
  updatedAt: Date
}

interface TCreateCompany {
  docIdentification: string
  fantasyName: string
  corporateReason?: string
  phone?: string
  email: string
  type?: number
  description?: string
  occupationAreaId?: number
}

interface TUpdateInfosCompany {
  id: number
  description: string
  occupationAreaId: number
}

export { TCompany, TCreateCompany, TUpdateInfosCompany }
