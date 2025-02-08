import { Router } from 'express'
import multer from 'multer'

import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'
import { uploadConfig } from '@/config/uploadImages'

const regx = ['jpeg', 'jpg', 'png', 'webp']

const companyRouter = Router()
const upload = multer(uploadConfig(regx))

companyRouter.use(middlewares.ensureToken)

companyRouter.get('/info-profile', controllers.companyController.getInfoProfile)

companyRouter.post('/register', controllers.companyController.create)

companyRouter.put(
  '/update/infos',
  middlewares.ensureUserClientAdmin,
  controllers.companyController.updateInfos,
)

companyRouter.get(
  '/list/search',
  controllers.companyController.getSearchCompaniesToCollector,
)

companyRouter.post(
  '/upload/profile',
  upload.single('file'),
  controllers.companyController.uploadImageProfile,
)

export { companyRouter }
