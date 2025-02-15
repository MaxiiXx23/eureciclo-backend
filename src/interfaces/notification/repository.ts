import { IPagination } from '../globals'

interface ICreateNotification {
  data: any
  userId: number
  receivedByUserId: number
  companyId?: number
}

interface IGetListNotification extends Omit<IPagination, 'status'> {
  id: number
}

export { ICreateNotification, IGetListNotification }
