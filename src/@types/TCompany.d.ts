// import { Company } from '@prisma/client'

import { TAddress } from './TAddress'

interface TCompany {
  id: number
  docIdentification: string
  fantasyName: string
  corporateReason: string | null
  phone: string | null
  email: string
  status: boolean
  type: number
  description: string | null
  occupationAreaId: number | null
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

interface TItemListCompany {
  id: number
  fantasyName: string
}

interface IGetInfoCompany {
  id: number
  docIdentification: string
  fantasyName: string
  corporateReason: string | null
  phone: string | null
  email: string
  description: string | null
  address: Omit<TAddress, 'userId' | 'companyId'>[]
}

export {
  TCompany,
  TCreateCompany,
  TUpdateInfosCompany,
  TItemListCompany,
  IGetInfoCompany,
}
