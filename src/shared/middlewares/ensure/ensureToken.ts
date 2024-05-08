import { NextFunction, Request, Response } from 'express'

import jwt from 'jsonwebtoken'

import { prismaProvider } from '@/shared/providers'
import { auth } from '@/config'
import TUserAuth from '@/@types/TUserAuth'
import { IPayloadTokenJWT } from '@/dtos/auth'

export async function ensureToken(
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
    const tokenDecoded = jwt.verify(
      token,
      auth.secret_key_JWT,
    ) as IPayloadTokenJWT

    const hasUser = await prismaProvider.queryDatabase((prisma) =>
      prisma.user.findUnique({
        where: {
          id: tokenDecoded.id,
        },
        select: {
          id: true,
          email: true,
          status: true,
          typeUserId: true,
          userCompany: true,
        },
      }),
    )

    if (!hasUser) {
      return res.status(401).json({
        error: 'Usuário inválido.',
      })
    }

    if (hasUser && !hasUser.status) {
      return res.status(401).json({
        error:
          'Sua conta foi temporariamente desativada. Por favor, entre em contato conosco.',
      })
    }

    const userMapped: TUserAuth = {
      id: hasUser.id,
      email: hasUser.email,
      status: hasUser.status,
      typeUser: hasUser.typeUserId,
      userCompany: hasUser.userCompany,
    }

    req.userAuth = userMapped

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
