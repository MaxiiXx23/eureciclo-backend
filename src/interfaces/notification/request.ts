import TUserAuth from '@/@types/TUserAuth'
import { IRequestPagination } from '../globals'

interface IRequestCreateNotification {
  user: TUserAuth
  type: number
  receivedByUserId: number
}

interface IRequestGetListNotificationsByUser
  extends Omit<IRequestPagination, 'status'> {
  id: number
}

export { IRequestCreateNotification, IRequestGetListNotificationsByUser }
