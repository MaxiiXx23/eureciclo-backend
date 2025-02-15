import { TGetItemLitNotification, TNotification } from '@/@types/TNotification'
import {
  ICreateNotification,
  IGetListNotification,
} from '@/interfaces/notification/repository'

export interface INotificationRepository {
  create(data: ICreateNotification): Promise<TNotification>
  getNotificationsByUser(
    data: IGetListNotification,
  ): Promise<TGetItemLitNotification[]>
  getTotalRowsNotificationsByUser(id: number): Promise<number>
}
