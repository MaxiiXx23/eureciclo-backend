import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'

export interface IUserRepository {
  updateName(data: IUpdateInfoNameUser): Promise<void>
  updatePhone(data: IPatchInfoPhoneUser): Promise<void>
}
