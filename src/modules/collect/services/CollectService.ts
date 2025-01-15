import { v4 as uuidv4 } from 'uuid'

import { ICollectRepository } from '@/shared/repositories/collect/ICollectRepository'
import {
  IRequestCreateCollect,
  IRequestCreateInProgressByCollector,
  IRequestGetCollectsByCollector,
  IRequestGetCollectsByUser,
} from '@/interfaces/collect/request'
import { TCreateCollect } from '@/@types/TCollect'
import { mapperCollectGetById } from '../mapper/mapperCollectGetById'
import { hydrateGetListCollectByUser } from '@/utils/hydrates/collect/hydrateGetListCollectByUser'

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

  async getCollectById(id: number) {
    const collect = await this.collectRepository.getById(id)

    if (!collect) {
      throw new Error('Informações sobre a coleta não encontra.')
    }

    const data = mapperCollectGetById(collect)

    return {
      data,
    }
  }

  async getInProgressByUserId(id: number) {
    const collect = await this.collectRepository.getInProgressByUserId(id)

    if (!collect) {
      throw new Error('Informações sobre a coleta não encontra.')
    }

    const data = mapperCollectGetById(collect)

    return {
      data,
    }
  }

  async getCollectsByUser({
    id,
    page,
    perPage,
    status,
    ordernation,
    search,
  }: IRequestGetCollectsByUser) {
    const offset = (page - 1) * perPage

    const list = await this.collectRepository.getCollectsByUser({
      id,
      offset,
      perPage,
      status,
      ordernation,
      search,
    })

    const totalRows = await this.collectRepository.getTotalRowsCollectsByUser(
      id,
      status,
      search,
    )

    const hydrated = hydrateGetListCollectByUser(list)

    const maxPage = Math.ceil(totalRows / perPage)

    return {
      collects: hydrated,
      rows: hydrated.length,
      maxPage,
      totalRows,
    }
  }

  // buscar de coletas por Endereço(região)
  async getCollectsToCollector({
    page,
    perPage,
    status,
    ordernation,
    search,
  }: IRequestGetCollectsByCollector) {
    const offset = (page - 1) * perPage

    const list = await this.collectRepository.getCollectsByCollector({
      offset,
      perPage,
      status,
      ordernation,
      search,
    })

    const totalRows =
      await this.collectRepository.getTotalRowsCollectsByCollector(
        status,
        search,
      )

    const hydrated = hydrateGetListCollectByUser(list)

    const maxPage = Math.ceil(totalRows / perPage)

    return {
      collects: hydrated,
      rows: hydrated.length,
      maxPage,
      totalRows,
    }
  }

  async createInProgressByCollector(data: IRequestCreateInProgressByCollector) {
    await this.collectRepository.createInProgressByCollector(data)

    await this.collectRepository.patchStatusCollect({
      id: data.id,
      statusCollectId: 3,
    })
  }
}
