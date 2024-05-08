import {
  TCompany,
  TCreateCompany,
  TUpdateInfosCompany,
} from '@/@types/TCompany'
import { TOccupationArea } from '@/@types/TOccupationArea'

export interface ICompanyRepository {
  getCompanyById(id: number): Promise<TCompany | null>
  // Trocar tipagem futuramente para pegar mais informaçoes, como: Photo, rating e etc
  getInfoProfileCompanyById(id: number): Promise<TCompany | null>
  getCompanyByDocIdentification(
    docIdentification: string,
  ): Promise<TCompany | null>
  create(data: TCreateCompany): Promise<TCompany>
  getOccupationAreaById(id: number): Promise<TOccupationArea | null>
  updateInfos(data: TUpdateInfosCompany): Promise<TCompany>
}
