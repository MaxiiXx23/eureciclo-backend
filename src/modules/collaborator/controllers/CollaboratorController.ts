import { Request, Response, NextFunction } from 'express'
import { CollaboratorUseCase } from '../useCase/CollaboratorUseCase'
import { TUserRegister } from '@/@types/TUser'
import { IRequestGtSearchCollectorsToCompany } from '@/interfaces/collaborator/request'

export class CollaboratorController {
  private collaboratorUseCase: CollaboratorUseCase

  constructor() {
    this.collaboratorUseCase = new CollaboratorUseCase()
  }

  register = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const payload: TUserRegister = req.body

      const { userCreated } = await this.collaboratorUseCase.register(payload)

      return res.status(201).json({
        collaborator: userCreated,
        message: 'Colaborador cadastrado com sucesso.',
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

  getSearchCollectorsToCompany = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage, search } = req.query

      const payload: IRequestGtSearchCollectorsToCompany = {
        page: Number(page),
        perPage: Number(perPage),
        search: String(search),
      }

      const { collectors, maxPage, rows, totalRows } =
        await this.collaboratorUseCase.getSearchCollectorsToCompany(payload)

      return res.status(200).json({
        collectors,
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

  getGetInfoUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { user } = await this.collaboratorUseCase.getGetInfoUserById(
        Number(id),
      )

      return res.status(200).json({
        user,
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
