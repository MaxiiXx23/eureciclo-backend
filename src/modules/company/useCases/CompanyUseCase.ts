import { PrismaCompanyRepository } from '@/shared/repositories/company/prisma/PrismaCompanyRepository'
import { CompanyService } from '../services/CompanyService'
import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'

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
}
