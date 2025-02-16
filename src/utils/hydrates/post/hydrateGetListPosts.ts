import { IGetItemPost } from '@/@types/Post'
import { IGetItemPostDTO } from '@/dtos/post'
import { services } from '@/config/services'

export function hydrateGetListPosts(data: IGetItemPost[]): IGetItemPostDTO[] {
  const list = data.map((item) => {
    const hydratedItem: IGetItemPostDTO = {
      id: item.id,
      title: item.title,
      urlImage: `${services.url}/imagens/${item.FilesPost[0].url}`,
    }

    return hydratedItem
  })

  return list
}
