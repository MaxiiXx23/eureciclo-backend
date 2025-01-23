import { PrismaCompanyRepository } from '@/shared/repositories/company/prisma/PrismaCompanyRepository'
import { CompanyService } from '../services/CompanyService'
import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IRequestGetSearchCompaniesToCollector } from '@/interfaces/company/request'
import { IRequestUploadImageProfile } from '@/interfaces/user/request'

export class CompanyUseCase {
  private companyService: CompanyService

  constructor() {
    this.companyService = new CompanyService(new PrismaCompanyRepository())
  }

  async create(data: TCreateCompany) {
    return await this.companyService.create(data)
  }

  async updateInfos(data: TUpdateInfosCompany) {
    return await this.companyService.updateInfos(data)
  }

  async getInfoProfile(id: number) {
    return await this.companyService.getInfoProfile(id)
  }

  async getSearchCompaniesToCollector(
    data: IRequestGetSearchCompaniesToCollector,
  ) {
    return await this.companyService.getSearchCompaniesToCollector(data)
  }

  async uploadImageProfileUser(data: IRequestUploadImageProfile) {
    return await this.companyService.uploadImageProfileUser(data)
  }
}
