import { IPagination } from '../globals'

interface IGetCollectsByUser extends Omit<IPagination, 'status'> {
  id: number
  status: number
}

export { IGetCollectsByUser }
