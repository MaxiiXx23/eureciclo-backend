import { TJsonDataNotification } from '@/@types/TNotification'
import {
  IRequestCreateNotification,
  IRequestGetListNotificationsByUser,
} from '@/interfaces/notification/request'
import { INotificationRepository } from '@/shared/repositories/notification/INotificationRepository'
import { genereteCodeCollect } from '@/utils/functions/genereteCodeCollect'
import { hydrateGetListNotifications } from '@/utils/hydrates/notification/hydrateGetListNotifications'

export class NotificationService {
  constructor(private notificationRepository: INotificationRepository) {}

  async create({ receivedByUserId, type, user }: IRequestCreateNotification) {
    const title = 'Avalie nosso serviço'
    const description = 'Avalie o atentimento da nossa empresa.'

    const code = genereteCodeCollect()

    const data: TJsonDataNotification = {
      title,
      description,
      alreadyUsed: false,
      code,
      type,
    }

    const notication = await this.notificationRepository.create({
      userId: user.id,
      receivedByUserId,
      companyId: user.userCompany[0].companyId,
      data,
    })

    return {
      notication,
    }
  }

  async getNotificationsByUser({
    id,
    page,
    perPage,
  }: IRequestGetListNotificationsByUser) {
    const offset = (page - 1) * perPage

    const list = await this.notificationRepository.getNotificationsByUser({
      id,
      offset,
      perPage,
    })

    const totalRows =
      await this.notificationRepository.getTotalRowsNotificationsByUser(id)

    const listHydrated = hydrateGetListNotifications(list)

    const maxPage = Math.ceil(totalRows / perPage)

    return {
      notifications: listHydrated,
      rows: listHydrated.length,
      maxPage,
      totalRows,
    }
  }
}
