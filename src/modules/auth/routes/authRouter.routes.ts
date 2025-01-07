import { Router } from 'express'
import { controllers } from '@/shared/imports/controllers'

const authRouter = Router()

authRouter.post('/login', controllers.authController.auth)
authRouter.get('/logout', controllers.authController.logout)
authRouter.post('/register', controllers.authController.register)
authRouter.post(
  '/register-company',
  controllers.authController.registerUserAndCompany,
)

export { authRouter }
