import { Router } from 'express'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const notificationRouter = Router()

notificationRouter.use(middlewares.ensureToken)

notificationRouter.post('/', controllers.noticationController.create)
notificationRouter.get(
  '/list/user',
  controllers.noticationController.getNotificationsByUser,
)

export { notificationRouter }
