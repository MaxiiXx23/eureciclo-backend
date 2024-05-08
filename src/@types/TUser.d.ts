import { TUserCompany } from './TUserCompany'

interface TUser {
  id: number
  email: string
  password: string
  fullName: string
  firstName: string
  lastName: string
  description: string
  phone: string
  docIdentification: string
  DateOfBirth: string
  status: boolean
  typeUserId: number
  createdAt: Date
  updatedAt: Date
}

interface TUserWithFieldUserCompany {
  id: number
  email: string
  password: string
  fullName: string
  firstName: string
  lastName: string
  description: string
  phone: string
  docIdentification: string
  DateOfBirth: string
  status: boolean
  typeUserId: number
  createdAt: Date
  updatedAt: Date
  userCompany: TUserCompany[]
}

interface TUserRegister {
  email: string
  password: string
  fullName: string
  phone: string
  docIdentification: string
  DateOfBirth: string
  typeUserId: number
  companyId: number | null
}

interface TUserRegisterFinal extends Omit<TUserRegister, 'companyId'> {
  firstName: string
  lastName: string
}

export { TUser, TUserRegister, TUserRegisterFinal, TUserWithFieldUserCompany }
