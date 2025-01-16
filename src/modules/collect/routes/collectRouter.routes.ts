import { Router } from 'express'
import multer from 'multer'

import { uploadConfig } from '@/config/uploadImages'
import { controllers } from '@/shared/imports/controllers'
import { middlewares } from '@/shared/imports/middlewares'

const collectRouter = Router()
const regx = [
  'jpeg',
  'jpg',
  'png',
  'pdf',
  'docx',
  'pptx',
  'xlsx',
  'zip',
  'webp',
]

const upload = multer(uploadConfig(regx))

collectRouter.use(middlewares.ensureToken)

collectRouter.post(
  '/',
  upload.single('file'),
  controllers.collectController.create,
)

collectRouter.get('/info', controllers.collectController.getCollectById)
collectRouter.get(
  '/info/in-progress',
  controllers.collectController.getInProgressByUserId,
)

collectRouter.get('/list/user', controllers.collectController.getCollectsByUser)
collectRouter.get(
  '/list/collector-search',
  controllers.collectController.getCollectsToCollector,
)
collectRouter.get(
  '/list/collector-search/process',
  controllers.collectController.getCollectsInProcessByCollector,
)

collectRouter.post(
  '/create/in-progress',
  controllers.collectController.createInProgressByCollector,
)

export { collectRouter }
