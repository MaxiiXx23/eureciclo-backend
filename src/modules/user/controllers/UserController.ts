import { Request, Response, NextFunction } from 'express'

import { UserUseCase } from '../useCases/UserUseCase'
import {
  IPatchInfoPhoneUser,
  IUpdateInfoNameUser,
} from '@/interfaces/user/repository'

export class UserController {
  private userUseCase: UserUseCase

  constructor() {
    this.userUseCase = new UserUseCase()
  }

  updateName = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { firstName, lastName }: IUpdateInfoNameUser = req.body
      const { id } = req.userAuth

      await this.userUseCase.updateName({
        id,
        firstName,
        lastName,
      })

      return res.status(200).json({
        message: 'Informações atualizadas com sucesso.',
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

  patchPhone = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { phone }: IPatchInfoPhoneUser = req.body
      const { id } = req.userAuth

      await this.userUseCase.patchPhone({
        id,
        phone,
      })

      return res.status(200).json({
        message: 'Telefone atualizado com sucesso.',
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
