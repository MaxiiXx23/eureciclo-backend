import { Router } from 'express'

import { middlewares } from '@/shared/imports/middlewares'
import { controllers } from '@/shared/imports/controllers'

const collaboratorRouter = Router()

collaboratorRouter.use(middlewares.ensureToken)

collaboratorRouter.post(
  '/register',
  middlewares.ensureUserClientAdmin,
  controllers.collaboratorController.register,
)

export { collaboratorRouter }
