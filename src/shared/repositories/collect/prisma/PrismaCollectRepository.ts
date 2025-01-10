import { prismaProvider } from '@/shared/providers'

import { TCollect, TCreateCollect } from '@/@types/TCollect'
import { ICollectRepository } from '../ICollectRepository'

export class PrismaCollectRepository implements ICollectRepository {
  async create(data: TCreateCollect): Promise<TCollect> {
    const collect = await prismaProvider.queryDatabase((prisma) =>
      prisma.collect.create({
        data,
      }),
    )

    return collect
  }
}
