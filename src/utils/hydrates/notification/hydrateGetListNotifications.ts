import dayjs from 'dayjs'

import { TGetItemLitNotification } from '@/@types/TNotification'
import { services } from '@/config/services'
import { IGetItemLitNotificationDTO } from '@/dtos/notification'

export function hydrateGetListNotifications(
  data: TGetItemLitNotification[],
): IGetItemLitNotificationDTO[] {
  const list = data.map((item) => {
    const hydratedItem: IGetItemLitNotificationDTO = {
      id: item.id,
      data: item.data as IGetItemLitNotificationDTO['data'],
      createdAt: dayjs(item.createdAt).format('DD/MM/YYYY'),
      company: item.company
        ? {
            id: item.company.id,
            name: item.company.fantasyName,
            urlImage:
              item.company.profileImage.length > 0
                ? `${services.url}/imagens/${item.company.profileImage[0].url}`
                : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
          }
        : null,
      user: {
        id: item.user.id,
        name: `${item.user.firstName} ${item.user.lastName}`,
        urlImage:
          item.user.profileImage.length > 0
            ? `${services.url}/imagens/${item.user.profileImage[0].url}`
            : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
      },
    }

    return hydratedItem
  })

  return list
}
