import { Router } from 'express'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const userRouter = Router()

userRouter.use(middlewares.ensureToken)

userRouter.put('/update/name', controllers.userController.updateName)
userRouter.patch('/update/phone', controllers.userController.patchPhone)

export { userRouter }
