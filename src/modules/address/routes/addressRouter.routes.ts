import { Router } from 'express'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const addressRouter = Router()

addressRouter.use(middlewares.ensureToken)

addressRouter.post('/', controllers.addressController.create)
addressRouter.put('/', controllers.addressController.update)

addressRouter.get('/info/user', controllers.addressController.getByUserId)
addressRouter.get('/info/company', controllers.addressController.getByCompanyId)

export { addressRouter }
