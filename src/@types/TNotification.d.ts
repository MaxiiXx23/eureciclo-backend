import { Prisma } from '@prisma/client'

interface TNotification {
  id: number
  data: Prisma.JsonValue
  userId: number
  isRead: boolean
  receivedByUserId: number
  companyId: number | null
  createdAt: Date
  updatedAt: Date
}

interface TJsonDataNotification {
  title: string
  description: string
  code: string
  type: number
  alreadyUsed: boolean
}

interface TGetItemLitNotification {
  data: Prisma.JsonValue
  id: number
  createdAt: Date
  user: {
    id: number
    firstName: string
    lastName: string
    profileImage: {
      id: number
      url: string
    }[]
  }
  company: {
    id: number
    profileImage: {
      id: number
      url: string
    }[]
    fantasyName: string
  } | null
}

export { TNotification, TJsonDataNotification, TGetItemLitNotification }
