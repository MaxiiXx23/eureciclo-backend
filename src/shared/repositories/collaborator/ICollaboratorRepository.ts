import { IGetItemListCollector } from '@/@types/TCollaborator'
import { TTypeUser } from '@/@types/TTypeUser'
import {
  TUser,
  TUserRegisterFinal,
  TUserWithFieldUserCompany,
} from '@/@types/TUser'
import { TCreateUserCompany, TUserCompany } from '@/@types/TUserCompany'
import { IGetSearchCollectorsToCompany } from '@/interfaces/collaborator/repository'
import { IGetInfoUser } from '@/interfaces/user/repository'

export interface ICollaboratorRepository {
  create(data: TCreateUserCompany): Promise<TUserCompany>
  createCollaborator(data: TUserRegisterFinal): Promise<TUser>
  getUserByEmail(email: string): Promise<TUserWithFieldUserCompany | null>
  getTypeUserById(id: number): Promise<TTypeUser | null>

  getSearchCollectorsToCompany(
    data: IGetSearchCollectorsToCompany,
  ): Promise<IGetItemListCollector[]>
  getTotalRowsSearchCollectorsToCompany(search?: string): Promise<number>

  getGetInfoUserById(id: number): Promise<IGetInfoUser | null>
}
