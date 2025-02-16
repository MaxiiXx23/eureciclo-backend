import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@/config/uploadImages'
import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const postRouter = Router()
const regx = ['jpeg', 'jpg', 'png', 'webp']

const upload = multer(uploadConfig(regx))

postRouter.use(middlewares.ensureToken)

postRouter.post('/', upload.single('file'), controllers.postController.create)

postRouter.get('/list', controllers.postController.getPostsByType)

postRouter.get('/', controllers.postController.getPostById)

export { postRouter }
