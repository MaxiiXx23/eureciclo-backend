import jsonwebtoken from 'jsonwebtoken'

import { prismaProvider } from '.'

import { auth } from '@/config'
import { IPayloadTokenJWT } from '@/dtos/auth'

export class GenerateTokenProvider {
  async token({
    id,
    email,
    firstName,
    lastName,
    typeUserId,
    businesses,
  }: IPayloadTokenJWT) {
    const expiresIn = auth.experies_in_JWT
    const secretKey = auth.secret_key_JWT

    const token = jsonwebtoken.sign(
      {
        id,
        firstName,
        lastName,
        email,
        typeUserId,
        businesses,
      },
      secretKey,
      {
        subject: id.toString(),
        expiresIn,
      },
    )
    return token
  }

  async refreshToken(id: number) {
    const expiresIn = auth.experies_in_refresh_JWT
    const secretKey = auth.secret_key_JWT

    const refreshToken = jsonwebtoken.sign(
      {
        id,
      },
      secretKey,
      {
        subject: String(id),
        expiresIn,
      },
    )

    await prismaProvider.queryDatabase((prisma) =>
      prisma.refreshToken.create({
        data: {
          token: refreshToken,
        },
      }),
    )

    return refreshToken
  }
}
