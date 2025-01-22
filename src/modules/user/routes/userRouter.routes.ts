import { Router } from 'express'
import multer from 'multer'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'
import { uploadConfig } from '@/config/uploadImages'

const regx = ['jpeg', 'jpg', 'png', 'webp']

const userRouter = Router()
const upload = multer(uploadConfig(regx))

userRouter.use(middlewares.ensureToken)

userRouter.put('/update/name', controllers.userController.updateName)
userRouter.patch('/update/phone', controllers.userController.patchPhone)

userRouter.post(
  '/upload/profile',
  upload.single('file'),
  controllers.userController.uploadImageProfile,
)

export { userRouter }
