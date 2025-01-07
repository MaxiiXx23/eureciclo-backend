import { TCreateCompany } from '@/@types/TCompany'
import { TUserRegister } from '@/@types/TUser'

interface ICreateUserAndCompany {
  user: TUserRegister
  company: TCreateCompany
}

export { ICreateUserAndCompany }
