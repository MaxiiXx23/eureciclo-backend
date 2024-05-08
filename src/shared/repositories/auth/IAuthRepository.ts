import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { TRefreshToken } from '@/@types/TUserAuth'

export interface IAuthRepository {
  createUser(data: TUserRegisterFinal): Promise<TUser>
  getUserById(id: number): Promise<TUser | null>
  getUserByEmail(email: string): Promise<TUserWithFieldUserCompany | null>
  findRefreshToken(token: string): Promise<TRefreshToken | null>
  deleteRefreshToken(id: number): Promise<TRefreshToken>
}
