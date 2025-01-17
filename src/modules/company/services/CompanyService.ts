import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IInfoProfileCompanyDTO, IUpdateInfoCompanyDTO } from '@/dtos/company'
import { IRequestGetSearchCompaniesToCollector } from '@/interfaces/company/request'
import { ICompanyRepository } from '@/shared/repositories/company/ICompanyRepository'

export class CompanyService {
  constructor(private companyRepository: ICompanyRepository) {}

  async getInfoProfile(id: number) {
    const info = await this.companyRepository.getInfoProfileCompanyById(id)

    if (!info) {
      throw new Error('Empresa não encontrada. Por favor, tente novamente')
    }

    const dataMapped: IInfoProfileCompanyDTO = {
      id: info.id,
      docIdentification: info.docIdentification,
      fantasyName: info.fantasyName,
      email: info.email,
      description: info.description,
      phone: info.phone,
      address: info.address.length > 0 ? info.address[0] : null,
    }

    return {
      info: dataMapped,
    }
  }

  async create(data: TCreateCompany) {
    const companyAlreadyExists =
      await this.companyRepository.getCompanyByDocIdentification(
        data.docIdentification,
      )

    if (companyAlreadyExists) {
      throw new Error('Empresa já existente.')
    }

    const companyCreated = await this.companyRepository.create(data)

    return {
      companyCreated,
    }
  }

  async updateInfos(data: TUpdateInfosCompany) {
    const hasCompany = await this.companyRepository.getCompanyById(data.id)

    if (!hasCompany) {
      throw new Error('Empresa não encontrada.')
    }

    const hasOccupationArea =
      await this.companyRepository.getOccupationAreaById(data.occupationAreaId)

    if (!hasOccupationArea) {
      throw new Error('Área de ocupação não encontrada.')
    }

    const companyUpdated = await this.companyRepository.updateInfos(data)

    const companyUpdatedDTO: IUpdateInfoCompanyDTO = {
      id: companyUpdated.id,
      description: companyUpdated.description,
      ocupationArea: hasOccupationArea,
    }

    return {
      companyUpdated: companyUpdatedDTO,
    }
  }

  async getSearchCompaniesToCollector({
    page,
    perPage,
    ordernation,
    search,
  }: IRequestGetSearchCompaniesToCollector) {
    const offset = (page - 1) * perPage

    const list = await this.companyRepository.getSearchCompaniesToCollector({
      offset,
      perPage,
      ordernation,
      search,
    })

    const totalRows =
      await this.companyRepository.getTotalRowsSearchCompaniesToCollector(
        search,
      )

    const maxPage = Math.ceil(totalRows / perPage)

    return {
      companies: list,
      rows: list.length,
      maxPage,
      totalRows,
    }
  }
}
