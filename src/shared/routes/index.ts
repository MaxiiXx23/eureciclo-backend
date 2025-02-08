import express from 'express'

import { authRouter } from '@/modules/auth/routes/authRouter.routes'
import { companyRouter } from '@/modules/company/routes/CompanyRouter.routes'
import { collaboratorRouter } from '@/modules/collaborator/routes/collaboratorRouter.routes'
import { collectRouter } from '@/modules/collect/routes/collectRouter.routes'
import { addressRouter } from '@/modules/address/routes/addressRouter.routes'
import { userRouter } from '@/modules/user/routes/userRouter.routes'
import { reviewRouter } from '@/modules/review/routes/reviewRouter.routes'

const appRouter = express.Router()

appRouter.use('/auth', authRouter)
appRouter.use('/company', companyRouter)
appRouter.use('/collaborator', collaboratorRouter)
appRouter.use('/collect', collectRouter)
appRouter.use('/address', addressRouter)
appRouter.use('/user', userRouter)
appRouter.use('/review', reviewRouter)

export { appRouter }
