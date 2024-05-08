import { Router } from 'express'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const companyRouter = Router()

companyRouter.get(
  '/info-profile',
  middlewares.ensureToken,
  controllers.companyController.getInfoProfile,
)

companyRouter.post('/register', controllers.companyController.create)

companyRouter.put(
  '/update/infos',
  middlewares.ensureToken,
  middlewares.ensureUserClientAdmin,
  controllers.companyController.updateInfos,
)

export { companyRouter }
