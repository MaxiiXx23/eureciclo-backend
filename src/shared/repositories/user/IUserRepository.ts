import { TProfileImage } from '@/@types/TProfileImage'
import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
  TCreateImageProfile,
  TUpdateImageProfile,
} from '@/interfaces/user/repository'

export interface IUserRepository {
  getImageProfileByUser(id: number): Promise<TProfileImage | null>
  updateName(data: IUpdateInfoNameUser): Promise<void>
  updatePhone(data: IPatchInfoPhoneUser): Promise<void>

  createUploadImageProfile(data: TCreateImageProfile): Promise<void>
  updateUploadImageProfile(data: TUpdateImageProfile): Promise<void>
  // apenas utilizada no ambiente de desenvolvimento, na produção usariamos soft-delete
  deleteImageProfile(id: number): Promise<void>
}
