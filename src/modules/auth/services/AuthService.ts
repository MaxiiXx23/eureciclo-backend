import { compare, hash } from 'bcrypt'

import { IAuthRepository } from '@/shared/repositories/auth/IAuthRepository'
import { generateTokenProvider } from '@/shared/providers'

import { IPayloadTokenJWT } from '@/dtos/auth'
import { TAuthCredentials, TLogout } from '@/@types/TUserAuth'
import { TUserRegister } from '@/@types/TUser'

export class AuthService {
  constructor(private authRepository: IAuthRepository) {}

  async auth(credentials: TAuthCredentials) {
    const hasUser = await this.authRepository.getUserByEmail(credentials.email)

    if (!hasUser) {
      throw new Error(
        'E-mail e/ou senha incorretos. Por favor, tente novamente.',
      )
    }

    const matchPassword = await compare(credentials.password, hasUser.password)

    if (!matchPassword) {
      throw new Error(
        'E-mail e/ou senha incorretos. Por favor, tente novamente.',
      )
    }

    if (hasUser.userCompany.length === 1) {
      const payload: IPayloadTokenJWT = {
        id: hasUser.id,
        email: hasUser.email,
        firstName: hasUser.firstName,
        lastName: hasUser.lastName,
        phone: hasUser.phone ? hasUser.phone : '',
        typeUserId: hasUser.typeUserId,
        businesses: {
          id: hasUser.userCompany[0].companyId,
          createdAt: hasUser.userCompany[0].createdAt,
        },
      }

      const token = await generateTokenProvider.token(payload)
      const refreshToken = await generateTokenProvider.refreshToken(hasUser.id)

      return {
        token,
        refreshToken,
      }
    } else {
      const payload: IPayloadTokenJWT = {
        id: hasUser.id,
        email: hasUser.email,
        firstName: hasUser.firstName,
        lastName: hasUser.lastName,
        phone: hasUser.phone ? hasUser.phone : '',
        typeUserId: hasUser.typeUserId,
        businesses: null,
      }

      const token = await generateTokenProvider.token(payload)
      const refreshToken = await generateTokenProvider.refreshToken(hasUser.id)

      return {
        token,
        refreshToken,
      }
    }
  }

  async logout(refreshToken: TLogout['refreshToken']) {
    const hasRefreshToken =
      await this.authRepository.findRefreshToken(refreshToken)

    if (!hasRefreshToken) {
      throw new Error('Erro ao fazer logout. Por favor, tente novamente.')
    }

    await this.authRepository.deleteRefreshToken(hasRefreshToken.id)
  }

  async register({
    email,
    DateOfBirth,
    docIdentification,
    fullName,
    password,
    phone,
    typeUserId,
  }: TUserRegister) {
    const hasAlreadyUser = await this.authRepository.getUserByEmail(email)

    if (hasAlreadyUser) {
      throw new Error('Erro ao utilizar este e-mail, pois, já está em uso.')
    }

    const passwordHashed = await hash(password, 6)
    const nameSplited = fullName.split(' ')
    const firstName = nameSplited[0]
    const lastName = nameSplited[nameSplited.length - 1]

    const userCreated = await this.authRepository.createUser({
      email,
      DateOfBirth,
      docIdentification,
      fullName,
      firstName,
      lastName,
      password: passwordHashed,
      phone,
      typeUserId,
    })

    return {
      userCreated,
    }
  }
}
