import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import { auth } from '@/config'
import { IPayloadTokenJWT } from '@/dtos/auth'

export async function ensureUserClientAdmin(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res
      .status(401)
      .json({
        error: 'Token ausente!',
      })
      .end()
  }

  const [, token] = authToken.split(' ')

  try {
    const tokenReplaced = token.replace('"', '').replace('"', '')
    const tokenDecoded = jwt.verify(
      tokenReplaced,
      auth.secret_key_JWT,
    ) as IPayloadTokenJWT

    const isUserCompany = req.userAuth.userCompany

    if (isUserCompany.length === 0) {
      return res.status(401).json({
        error: 'Acesso negado. Usuário não é um colaborador.',
      })
    }

    if (isUserCompany[0].companyId !== tokenDecoded.businesses?.id) {
      return res.status(401).json({
        error: 'Acesso negado. Usuário pertence a empresa.',
      })
    }

    if (!isUserCompany[0].admin) {
      return res.status(401).json({
        error:
          'Acesso negado. Usuário não possível acesso como administrador da empresa.',
      })
    }

    return next()
  } catch (error) {
    return res
      .status(400)
      .json({
        message: 'Error ao validar token.',
      })
      .end()
  }
}
