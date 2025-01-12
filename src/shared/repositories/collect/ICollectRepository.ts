import { TCollect, TCreateCollect } from '@/@types/TCollect'
import { IGetInfoCollect, IGetListCollectsByUser } from '@/interfaces/collect'
import { IGetCollectsByUser } from '@/interfaces/collect/repository'

export interface ICollectRepository {
  create(data: TCreateCollect): Promise<TCollect>
  getById(id: number): Promise<IGetInfoCollect | null>
  getCollectsByUser(data: IGetCollectsByUser): Promise<IGetListCollectsByUser[]>
  getTotalRowsCollectsByUser(
    id: number,
    status: number,
    search?: string,
  ): Promise<number>
}
