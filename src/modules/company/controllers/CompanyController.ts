import { Request, Response, NextFunction } from 'express'
import { CompanyUseCase } from '../useCases/CompanyUseCase'
import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'
import { IRequestGetSearchCompaniesToCollector } from '@/interfaces/company/request'

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
      const { description, occupationAreaId }: Omit<TUpdateInfosCompany, 'id'> =
        req.body

      const payload: TUpdateInfosCompany = {
        id: Number(id),
        description,
        occupationAreaId,
      }
      await this.companyUseCase.updateInfos(payload)

      return res.status(200).json({
        message: 'Informações atualizadas com sucesso.',
      })
    } catch (error) {
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
}
