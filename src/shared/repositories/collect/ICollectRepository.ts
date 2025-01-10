import { TCollect, TCreateCollect } from '@/@types/TCollect'

export interface ICollectRepository {
  create(data: TCreateCollect): Promise<TCollect>
}
