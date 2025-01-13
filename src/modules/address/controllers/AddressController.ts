import { Request, Response, NextFunction } from 'express'

import { AddressUseCase } from '../useCases/AddressUseCase'

import {
  IRequestCreateAddress,
  IRequestUpdateAddress,
} from '@/interfaces/address/request'

export class AddressController {
  private addressUseCase: AddressUseCase

  constructor() {
    this.addressUseCase = new AddressUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const payload: IRequestCreateAddress = req.body

      await this.addressUseCase.create(payload)

      return res.status(201).json({
        message: 'Endereço registrado com sucesso.',
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

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const payload: IRequestUpdateAddress = req.body

      await this.addressUseCase.update(payload)

      return res.status(200).json({
        message: 'Endereço atualizado com sucesso.',
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

  getByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { address } = await this.addressUseCase.getByUserId(Number(id))

      return res.status(200).json({
        address,
        message: 'Endereço regastado com sucesso.',
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

  getByCompanyId = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.query

      const { address } = await this.addressUseCase.getByCompanyId(Number(id))

      return res.status(200).json({
        address,
        message: 'Endereço regastado com sucesso.',
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
