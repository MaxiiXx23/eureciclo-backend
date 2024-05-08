import { Request, Response, NextFunction } from 'express'
import { CollaboratorUseCase } from '../useCase/CollaboratorUseCase'
import { TUserRegister } from '@/@types/TUser'

export class CollaboratorController {
  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authUseCase = new CollaboratorUseCase()

      const payload: TUserRegister = req.body

      const { userCreated } = await authUseCase.register(payload)

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
}
