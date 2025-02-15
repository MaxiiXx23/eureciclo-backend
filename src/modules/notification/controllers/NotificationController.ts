import { Request, Response, NextFunction } from 'express'
import { NotificationUseCase } from '../useCases/NotificationUseCase'
import {
  IRequestCreateNotification,
  IRequestGetListNotificationsByUser,
} from '@/interfaces/notification/request'

export class NoticationController {
  private notificationUseCase: NotificationUseCase

  constructor() {
    this.notificationUseCase = new NotificationUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const {
        receivedByUserId,
        type,
      }: Omit<IRequestCreateNotification, 'user'> = req.body
      const user = req.userAuth

      const payload: IRequestCreateNotification = {
        receivedByUserId,
        type,
        user,
      }

      await this.notificationUseCase.create(payload)

      return res.status(201).json({
        message: 'Notificação enviada com sucesso.',
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

  getNotificationsByUser = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { page, perPage } = req.query

      const { id } = req.userAuth

      const payload: IRequestGetListNotificationsByUser = {
        id,
        page: Number(page),
        perPage: Number(perPage),
      }

      const { notifications, maxPage, rows, totalRows } =
        await this.notificationUseCase.getNotificationsByUser(payload)

      return res.status(200).json({
        notifications,
        currentPage: Number(page),
        maxPage,
        rows,
        totalRows,
        message: 'Notificações resgatadas com sucesso.',
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
