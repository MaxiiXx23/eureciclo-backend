import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IInfoProfileCompanyDTO, IUpdateInfoCompanyDTO } from '@/dtos/company'
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

    const hasOccupationArea =
      await this.companyRepository.getOccupationAreaById(data.occupationAreaId)

    if (!hasOccupationArea) {
      throw new Error('Área de ocupação da empresa não encontrada.')
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
}
