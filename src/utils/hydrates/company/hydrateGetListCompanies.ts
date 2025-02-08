import { TItemListCompany } from '@/@types/TCompany'
import { services } from '@/config/services'
import { IGetItemListCompaniesDTO } from '@/dtos/company'

export function hydrateGetListCompanies(
  data: TItemListCompany[],
): IGetItemListCompaniesDTO[] {
  const list = data.map((item) => {
    const hydratedItem: IGetItemListCompaniesDTO = {
      id: item.id,
      name: item.fantasyName,
      rating: item.rating,
      urlImage:
        item.profileImage.length > 0
          ? `${services.url}/imagens/${item.profileImage[0].url}`
          : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
    }

    return hydratedItem
  })

  return list
}
