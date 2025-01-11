import { prismaProvider } from '@/shared/providers'

import { IImagesCollectRepository } from '../IImagesCollectRepository'
import { TCreateImagesCollect, TImagesCollect } from '@/@types/TImagesCollect'

export class PrismaImagesCollectRepository implements IImagesCollectRepository {
  async create(data: TCreateImagesCollect): Promise<TImagesCollect> {
    const image = await prismaProvider.queryDatabase((prisma) =>
      prisma.imagesCollect.create({
        data,
      }),
    )

    return image
  }
}
