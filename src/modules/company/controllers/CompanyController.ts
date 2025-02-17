import { Request, Response, NextFunction } from 'express'

import { CompanyUseCase } from '../useCases/CompanyUseCase'
import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IRequestGetSearchCompaniesToCollector } from '@/interfaces/company/request'

import { NotFoundError } from '@/utils/exceptions/NotFoundError'
import { BadRequestError } from '@/utils/exceptions/BadRequestError'

export class CompanyController {
  private companyUseCase: CompanyUseCase

  constructor() {
    this.companyUseCase = new CompanyUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const payload: TCreateCompany = req.body

      await this.companyUseCase.create(payload)

      return res.status(201).json({
        message: 'Empresa cadastrada com sucesso.',
      })
    } catch (error) {
      if (error instanceof BadRequestError) {
        return res.status(error.code).json({
          message: error.message,
        })
      }

      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        })
      }

      return next(error)
    }
  }

  updateInfos = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query
      const {
        description,
        email,
        fantasyName,
        corporateReason,
        phone,
      }: Omit<TUpdateInfosCompany, 'id'> = req.body

      const payload: TUpdateInfosCompany = {
        id: Number(id),
        description,
        email,
        fantasyName,
        corporateReason,
        phone,
      }
      await this.companyUseCase.updateInfos(payload)

      return res.status(200).json({
        message: 'Informações atualizadas com sucesso.',
      })
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.code).json({
          message: error.message,
        })
      }

      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        })
      }

      return next(error)
    }
  }

  getInfoProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { info } = await this.companyUseCase.getInfoProfile(Number(id))

      return res.status(200).json({
        company: info,
        message: 'Informações resgatadas com sucesso.',
      })
    } catch (error) {
      if (error instanceof NotFoundError) {
        return res.status(error.code).json({
          message: error.message,
        })
      }

      if (error instanceof Error) {
        return res.status(500).json({
          message: error.message,
        })
      }

      return next(error)
    }
  }

  getSearchCompaniesToCollector = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage, search } = req.query

      const payload: IRequestGetSearchCompaniesToCollector = {
        page: Number(page),
        perPage: Number(perPage),
        search: String(search),
      }

      const { companies, maxPage, rows, totalRows } =
        await this.companyUseCase.getSearchCompaniesToCollector(payload)

      return res.status(200).json({
        companies,
        currentPage: Number(page),
        maxPage,
        rows,
        totalRows,
        message: 'Informações resgatadas com sucesso.',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }

  uploadImageProfile = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { file } = req
      const { id } = req.query

      // vai precinar retornar a url para atualizar no Front de forma instantanea
      const { urlImage } = await this.companyUseCase.uploadImageProfileUser({
        id: Number(id),
        file: file!,
      })

      return res.status(200).json({
        urlImage,
        message: 'Foto de perfil atualizada com sucesso.',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }
}
