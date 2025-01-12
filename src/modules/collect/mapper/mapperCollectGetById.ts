import dayjs from 'dayjs'

import { services } from '@/config/services'
import { IGetInfoCollectDTO } from '@/dtos/collect'
import { IGetInfoCollect } from '@/interfaces/collect'

export function mapperCollectGetById(
  data: IGetInfoCollect,
): IGetInfoCollectDTO {
  const dataDTO: IGetInfoCollectDTO = {
    id: data.id,
    code: data.code,
    description: data.description,
    collectedAt: data.collectedAt
      ? dayjs(data.collectedAt).format('DD/MM/YYYY')
      : '',
    receivedAt: data.receivedAt
      ? dayjs(data.receivedAt).format('DD/MM/YYYY')
      : '',
    createdAt: dayjs(data.createdAt).format('DD/MM/YYYY'),
    user: {
      id: data.user.id,
      name: `${data.user.firstName} ${data.user.lastName}`,
    },
    status: data.statusCollect,
    image: {
      id: data.ImagesCollect[0].id,
      url: `${services.url}/imagens/${data.ImagesCollect[0].url}`,
    },
    addresses: data.addresses,
  }

  return dataDTO
}