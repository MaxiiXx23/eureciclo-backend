import { Request, Response, NextFunction } from 'express'
import { CollectUseCase } from '../useCases/CollectUseCase'
import {
  IRequestCreateCollect,
  IRequestGetCollectsByCollector,
  IRequestGetCollectsByUser,
} from '@/interfaces/collect/request'

export class CollectController {
  private collectUseCase: CollectUseCase

  constructor() {
    this.collectUseCase = new CollectUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      // Utilizando Parse para converter o Text da request para JSON em uma mesma requisição com FIle e JSON (Form-data)
      const body: IRequestCreateCollect = JSON.parse(req.body.data)
      const { file } = req
      const { id } = req.userAuth

      const payload: IRequestCreateCollect = {
        file: file!,
        description: body.description,
        addressId: body.addressId,
        statusCollectId: body.statusCollectId,
        userId: id,
      }

      await this.collectUseCase.create(payload)

      return res.status(201).json({
        message: 'Collect registrada com sucesso.',
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

  getCollectById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { data } = await this.collectUseCase.getCollectById(Number(id))

      return res.status(201).json({
        collect: data,
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

  getCollectsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage, status, search } = req.query
      const { id } = req.userAuth

      const payload: IRequestGetCollectsByUser = {
        id,
        page: Number(page),
        perPage: Number(perPage),
        search: String(search),
        status: Number(status),
      }

      const { collects, maxPage, rows, totalRows } =
        await this.collectUseCase.getCollectsByUser(payload)

      return res.status(201).json({
        collects,
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

  getCollectsToCollector = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage, status, search } = req.query

      const payload: IRequestGetCollectsByCollector = {
        page: Number(page),
        perPage: Number(perPage),
        search: String(search),
        status: Number(status),
      }

      const { collects, maxPage, rows, totalRows } =
        await this.collectUseCase.getCollectsToCollector(payload)

      return res.status(201).json({
        collects,
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
