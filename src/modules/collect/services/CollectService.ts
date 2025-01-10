import { v4 as uuidv4 } from 'uuid'

import { ICollectRepository } from '@/shared/repositories/collect/ICollectRepository'
import { IRequestCreateCollect } from '@/interfaces/collect/request'
import { TCreateCollect } from '@/@types/TCollect'

export class CollectService {
  constructor(private collectRepository: ICollectRepository) {}

  async create({
    description,
    addressId,
    statusCollectId,
    userId,
  }: IRequestCreateCollect) {
    const code = uuidv4()

    const data: TCreateCollect = {
      code,
      description,
      addressId,
      statusCollectId,
      userId,
    }

    const collectCreated = await this.collectRepository.create(data)

    return {
      collectCreated,
    }
  }
}
