import { IPagination } from '../globals'

interface IGetCollectsByUser extends Omit<IPagination, 'status'> {
  id: number
  status: number
}

interface IGetCollectsByCollector extends Omit<IPagination, 'status'> {
  status: number[]
}

interface IGetCollectsInProcessByCollector extends Omit<IPagination, 'status'> {
  id: number
  status: number[]
}

export {
  IGetCollectsByUser,
  IGetCollectsByCollector,
  IGetCollectsInProcessByCollector,
}
