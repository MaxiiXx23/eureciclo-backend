import { TGetItemLitNotification, TNotification } from '@/@types/TNotification'
import {
  ICreateNotification,
  IGetListNotification,
} from '@/interfaces/notification/repository'
import { INotificationRepository } from '../INotificationRepository'
import { prismaProvider } from '@/shared/providers'

export class PrismaNotificationRepository implements INotificationRepository {
  async create({
    data,
    receivedByUserId,
    userId,
    companyId,
  }: ICreateNotification): Promise<TNotification> {
    const createdNotication = await prismaProvider.queryDatabase((prisma) =>
      prisma.notification.create({
        data: {
          data,
          companyId,
          receivedByUserId,
          userId,
        },
      }),
    )

    return createdNotication
  }

  async getNotificationsByUser({
    id,
    offset,
    perPage,
  }: IGetListNotification): Promise<TGetItemLitNotification[]> {
    const list = await prismaProvider.queryDatabase((prisma) =>
      prisma.notification.findMany({
        where: {
          receivedByUserId: id,
        },
        select: {
          id: true,
          data: true,
          createdAt: true,
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
          company: {
            select: {
              id: true,
              fantasyName: true,
              profileImage: {
                select: {
                  id: true,
                  url: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: offset,
        take: perPage,
      }),
    )

    return list
  }

  async getTotalRowsNotificationsByUser(id: number): Promise<number> {
    const total = await prismaProvider.queryDatabase((prisma) =>
      prisma.notification.count({
        where: {
          receivedByUserId: id,
        },
      }),
    )

    return total
  }
}
