import {
  IGetInfoCompany,
  TCompany,
  TCreateCompany,
  TItemListCompany,
  TUpdateInfosCompany,
} from '@/@types/TCompany'
import { TOccupationArea } from '@/@types/TOccupationArea'
import { TProfileImage } from '@/@types/TProfileImage'
import { IGetSearchCompaniesToCollector } from '@/interfaces/company/repository'
import {
  TCreateImageProfile,
  TUpdateImageProfile,
} from '@/interfaces/user/repository'

export interface ICompanyRepository {
  getCompanyById(id: number): Promise<TCompany | null>
  // Trocar tipagem futuramente para pegar mais informaçoes, como: Photo, rating e etc
  getInfoProfileCompanyById(id: number): Promise<IGetInfoCompany | null>
  getCompanyByDocIdentification(
    docIdentification: string,
  ): Promise<TCompany | null>
  getOccupationAreaById(id: number): Promise<TOccupationArea | null>

  getSearchCompaniesToCollector(
    data: IGetSearchCompaniesToCollector,
  ): Promise<TItemListCompany[]>
  getTotalRowsSearchCompaniesToCollector(search?: string): Promise<number>

  getImageProfileByCompany(id: number): Promise<TProfileImage | null>
  create(data: TCreateCompany): Promise<TCompany>
  updateInfos(data: TUpdateInfosCompany): Promise<TCompany>
  createUploadImageProfile(data: TCreateImageProfile): Promise<void>
  updateUploadImageProfile(data: TUpdateImageProfile): Promise<void>
  // apenas utilizada no ambiente de desenvolvimento, na produção usariamos soft-delete
  deleteImageProfile(id: number): Promise<void>
}
