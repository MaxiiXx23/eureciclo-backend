import {
  TCollect,
  TCreateCollect,
  TPatchInProcessCollectById,
} from '@/@types/TCollect'
import { IGetInfoCollect, IGetListCollectsByUser } from '@/interfaces/collect'
import {
  IGetCollectsByCollector,
  IGetCollectsByUser,
  IGetCollectsInProcessByCollector,
} from '@/interfaces/collect/repository'
import { IRequestCreateInProgressByCollector } from '@/interfaces/collect/request'

export interface ICollectRepository {
  create(data: TCreateCollect): Promise<TCollect>
  getByIdAndCode(id: number, code: string): Promise<TCollect | null>
  pathConfirmCollect(id: number): Promise<TCollect | null>

  getById(id: number): Promise<IGetInfoCollect | null>
  getInProgressByUserId(id: number): Promise<IGetInfoCollect | null>
  getCollectsByUser(data: IGetCollectsByUser): Promise<IGetListCollectsByUser[]>
  getTotalRowsCollectsByUser(
    id: number,
    status: number,
    search?: string,
  ): Promise<number>

  getCollectsByCollector(
    data: IGetCollectsByCollector,
  ): Promise<IGetListCollectsByUser[]>

  getTotalRowsCollectsByCollector(
    status: number[],
    search?: string,
  ): Promise<number>

  createInProgressByCollector(
    data: IRequestCreateInProgressByCollector,
  ): Promise<void>

  patchStatusCollect(data: TPatchInProcessCollectById): Promise<void>

  getCollectsInProcessByCollector(
    data: IGetCollectsInProcessByCollector,
  ): Promise<IGetListCollectsByUser[]>

  getTotalRowsCollectsInProcessByCollector(
    id: number,
    status: number[],
    search?: string,
  ): Promise<number>
}
