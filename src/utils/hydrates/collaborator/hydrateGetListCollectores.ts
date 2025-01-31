import { IGetItemListCollector } from '@/@types/TCollaborator'
import { services } from '@/config/services'
import { IGetItemListCompaniesDTO } from '@/dtos/company'
import { IGetItemListCollectorDTO } from '@/dtos/user'

export function hydrateGetListCollectores(
  data: IGetItemListCollector[],
): IGetItemListCompaniesDTO[] {
  const list = data.map((item) => {
    const hydratedItem: IGetItemListCollectorDTO = {
      id: item.id,
      name: `${item.firstName} ${item.lastName}`,
      urlImage:
        item.profileImage.length > 0
          ? `${services.url}/imagens/${item.profileImage[0].url}`
          : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
    }

    return hydratedItem
  })

  return list
}
