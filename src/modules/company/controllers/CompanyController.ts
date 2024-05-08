import { Request, Response, NextFunction } from 'express'
import { CompanyUseCase } from '../useCases/CompanyUseCase'
import { TCreateCompany, TUpdateInfosCompany } from '@/@types/TCompany'

export class CompanyController {
  async create(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const payload: TCreateCompany = req.body

      const companyUseCase = new CompanyUseCase()

      await companyUseCase.create(payload)

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

  async updateInfos(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.query
      const { description, occupationAreaId }: Omit<TUpdateInfosCompany, 'id'> =
        req.body

      const companyUseCase = new CompanyUseCase()

      const payload: TUpdateInfosCompany = {
        id: Number(id),
        description,
        occupationAreaId,
      }
      await companyUseCase.updateInfos(payload)

      return res.status(201).json({
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

  async getInfoProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.query

      const companyUseCase = new CompanyUseCase()

      const { info } = await companyUseCase.getInfoProfile(Number(id))

      return res.status(201).json({
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
}
