import { Request, Response, NextFunction } from 'express'
import { CollectUseCase } from '../useCases/CollectUseCase'
import { IRequestCreateCollect } from '@/interfaces/collect/request'

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

      const { id } = req.userAuth

      const payload: IRequestCreateCollect = {
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
}
