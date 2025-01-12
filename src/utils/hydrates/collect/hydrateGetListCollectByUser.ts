import dayjs from 'dayjs'

import { IGetListCollectsByUser } from '@/interfaces/collect'
import { IGetListCollectsByUserDTO } from '@/dtos/collect'

export function hydrateGetListCollectByUser(
  data: IGetListCollectsByUser[],
): IGetListCollectsByUserDTO[] {
  const list = data.map((item) => {
    const hydratedItem: IGetListCollectsByUserDTO = {
      id: item.id,
      status: item.statusCollect,
      createdAt: dayjs(item.createdAt).format('DD/MM/YYYY'),
    }

    return hydratedItem
  })

  return list
}
