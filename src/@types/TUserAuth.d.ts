import { TUserCompany } from './TUserCompany'

export default interface TUserAuth {
  id: number
  email: string
  status: boolean
  typeUser: number
  userCompany: TUserCompany[]
}

interface TAuthCredentials {
  email: string
  password: string
}

interface TLogout {
  refreshToken: string
}

interface TRefreshToken {
  id: number
  token: string
  userId: number | null
  createdAt: Date
  updatedAt: Date
}

export { TAuthCredentials, TLogout, TRefreshToken }
