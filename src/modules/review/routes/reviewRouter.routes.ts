import { Router } from 'express'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const reviewRouter = Router()

reviewRouter.use(middlewares.ensureToken)

reviewRouter.post('/', controllers.reviewController.create)

export { reviewRouter }
