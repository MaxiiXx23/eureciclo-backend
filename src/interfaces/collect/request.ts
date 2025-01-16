import { TCreateCollect } from '@/@types/TCollect'
import { IRequestPagination } from '../globals'

interface IRequestCreateCollect extends Omit<TCreateCollect, 'code'> {
  file: Express.Multer.File
}

interface IRequestGetCollectsByUser extends Omit<IRequestPagination, 'status'> {
  id: number
  status: number
}

interface IRequestGetCollectsByCollector
  extends Omit<IRequestPagination, 'status'> {
  status: string
}

interface IRequestCreateInProgressByCollector {
  id: number
  collectorId: number
}

interface IRequestGetCollectsInProcessByCollector
  extends Omit<IRequestPagination, 'status'> {
  id: number
  status: string
}

export {
  IRequestCreateCollect,
  IRequestGetCollectsByUser,
  IRequestGetCollectsByCollector,
  IRequestCreateInProgressByCollector,
  IRequestGetCollectsInProcessByCollector,
}
