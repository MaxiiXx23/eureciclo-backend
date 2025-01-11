import { TCreateImagesCollect, TImagesCollect } from '@/@types/TImagesCollect'

export interface IImagesCollectRepository {
  create(data: TCreateImagesCollect): Promise<TImagesCollect>
}
