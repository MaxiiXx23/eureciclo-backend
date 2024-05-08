import { TTypeUser } from '@/@types/TTypeUser'
import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { TCreateUserCompany, TUserCompany } from '@/@types/TUserCompany'

export interface ICollaboratorRepository {
  create(data: TCreateUserCompany): Promise<TUserCompany>
  getUserByEmail(email: string): Promise<TUserWithFieldUserCompany | null>
  createCollaborator(data: TUserRegisterFinal): Promise<TUser>
  getTypeUserById(id: number): Promise<TTypeUser | null>
}
