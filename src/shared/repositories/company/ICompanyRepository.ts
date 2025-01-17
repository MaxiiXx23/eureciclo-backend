import {
  IGetInfoCompany,
  TCompany,
  TCreateCompany,
  TItemListCompany,
  TUpdateInfosCompany,
} from '@/@types/TCompany'
import { TOccupationArea } from '@/@types/TOccupationArea'
import { IGetSearchCompaniesToCollector } from '@/interfaces/company/repository'

export interface ICompanyRepository {
  getCompanyById(id: number): Promise<TCompany | null>
  // Trocar tipagem futuramente para pegar mais informaçoes, como: Photo, rating e etc
  getInfoProfileCompanyById(id: number): Promise<IGetInfoCompany | null>
  getCompanyByDocIdentification(
    docIdentification: string,
  ): Promise<TCompany | null>
  create(data: TCreateCompany): Promise<TCompany>
  getOccupationAreaById(id: number): Promise<TOccupationArea | null>
  updateInfos(data: TUpdateInfosCompany): Promise<TCompany>

  getSearchCompaniesToCollector(
    data: IGetSearchCompaniesToCollector,
  ): Promise<TItemListCompany[]>

  getTotalRowsSearchCompaniesToCollector(search?: string): Promise<number>
}
