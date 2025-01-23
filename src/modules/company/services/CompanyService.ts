import path from 'path'
import fs from 'fs'

import { services } from '@/config/services'
import { tmpFolder } from '@/config/uploadImages'

import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IInfoProfileCompanyDTO, IUpdateInfoCompanyDTO } from '@/dtos/company'
import { IRequestGetSearchCompaniesToCollector } from '@/interfaces/company/request'
import { ICompanyRepository } from '@/shared/repositories/company/ICompanyRepository'
import { IRequestUploadImageProfile } from '@/interfaces/user/request'

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
      corporateReason: info.corporateReason ? info.corporateReason : '',
      fantasyName: info.fantasyName,
      email: info.email,
      description: info.description ? info.description : '',
      phone: info.phone ? info.phone : '',
      urlImage:
        info.profileImage.length > 0
          ? `${services.url}/imagens/${info.profileImage[0].url}`
          : `${services.url}/imagens/foto-perfil-sem-imagem.jpg`,
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

    const companyUpdated = await this.companyRepository.updateInfos(data)

    const companyUpdatedDTO: IUpdateInfoCompanyDTO = {
      id: companyUpdated.id,
      description: companyUpdated.description ? companyUpdated.description : '',
      corporateReason: companyUpdated.corporateReason
        ? companyUpdated.corporateReason
        : '',
      fantasyName: companyUpdated.fantasyName,
      email: companyUpdated.email,
      phone: companyUpdated.phone ? companyUpdated.phone : '',
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

  async uploadImageProfileUser({ id, file }: IRequestUploadImageProfile) {
    const key = `${file.filename}`

    const hasImageProfile =
      await this.companyRepository.getImageProfileByCompany(id)

    if (hasImageProfile) {
      await this.companyRepository.updateUploadImageProfile({
        id: hasImageProfile.id,
        url: key,
        size: file.size,
        type: file.mimetype,
      })

      const originalPath = path.resolve(tmpFolder, hasImageProfile.url)

      await fs.promises.unlink(originalPath)

      await this.companyRepository.deleteImageProfile(hasImageProfile.id)
    }

    await this.companyRepository.createUploadImageProfile({
      url: key,
      size: file.size,
      type: file.mimetype,
      companyId: id,
    })

    return {
      urlImage: `${services.url}/imagens/${key}`,
    }
  }
}
