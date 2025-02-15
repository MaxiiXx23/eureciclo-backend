import { PrismaNotificationRepository } from '@/shared/repositories/notification/prisma/PrismaNotificationRepository'
import { NotificationService } from '../services/NotificationService'
import {
  IRequestCreateNotification,
  IRequestGetListNotificationsByUser,
} from '@/interfaces/notification/request'

export class NotificationUseCase {
  private notificationService: NotificationService

  constructor() {
    this.notificationService = new NotificationService(
      new PrismaNotificationRepository(),
    )
  }

  async create(data: IRequestCreateNotification) {
    return await this.notificationService.create(data)
  }

  async getNotificationsByUser(data: IRequestGetListNotificationsByUser) {
    return await this.notificationService.getNotificationsByUser(data)
  }
}
