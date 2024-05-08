import { NextFunction, Request, Response } from 'express'

import { AuthUseCase } from '../useCases/AuthUseCase'
import { TAuthCredentials } from '@/@types/TUserAuth'
import { TUserRegister } from '@/@types/TUser'

export class AuthController {
  async auth(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { email, password }: TAuthCredentials = req.body

      const authUseCase = new AuthUseCase()

      const { token, refreshToken } = await authUseCase.auth({
        email,
        password,
      })

      return res.status(200).json({
        token,
        refreshToken,
        message: 'Login realizado com sucesso.',
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

  async logout(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authUseCase = new AuthUseCase()

      const { tk } = req.query

      await authUseCase.logout(String(tk))

      return res.status(200).json({
        message: 'Você foi desconectado com sucesso.',
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

  async register(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const authUseCase = new AuthUseCase()

      const payload: TUserRegister = req.body

      await authUseCase.register(payload)

      return res.status(201).json({
        message: 'Sua conta foi criada com sucesso.',
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
