import { TGetPost } from '@/@types/Post'
import { IGetPostDTO } from '@/dtos/post'

import { services } from '@/config/services'

export function mapperPost(data: TGetPost): IGetPostDTO {
  const hydratedItem: IGetPostDTO = {
    id: data.id,
    title: data.title,
    description: data.description,
    createdAt: data.createdAt,
    file: `${services.url}/imagens/${data.FilesPost[0].url}`,
  }

  return hydratedItem
}
