import { mapperCollectGetById } from '../mapper/mapperCollectGetById'
import { hydrateGetListCollectByUser } from '@/utils/hydrates/collect/hydrateGetListCollectByUser'
import { genereteCodeCollect } from '@/utils/functions/genereteCodeCollect'

import { ICollectRepository } from '@/shared/repositories/collect/ICollectRepository'
import {
  IRequestCreateCollect,
  IRequestCreateInProgressByCollector,
  IRequestGetCollectsByCollector,
  IRequestGetCollectsByUser,
  IRequestGetCollectsInProcessByCollector,
} from '@/interfaces/collect/request'
import { TCreateCollect } from '@/@types/TCollect'

import { BadRequestError } from '@/utils/exceptions/BadRequestError'
import { NotFoundError } from '@/utils/exceptions/NotFoundError'

export class CollectService {
  constructor(private collectRepository: ICollectRepository) {}

  async create({
    description,
    addressId,
    statusCollectId,
    userId,
  }: IRequestCreateCollect) {
    const code = genereteCodeCollect()

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

  async patchConfirmCollect(id: number, code: string) {
    const codeFormmated = code.toLocaleUpperCase()

    const data = await this.collectRepository.getByIdAndCode(id, codeFormmated)

    if (!data) {
      throw new BadRequestError('Solicitação de coleta não encontrada!')
    }

    await this.collectRepository.pathConfirmCollect(id)
  }

  async getCollectById(id: number) {
    const collect = await this.collectRepository.getById(id)

    if (!collect) {
      throw new NotFoundError('Informações sobre a coleta não encontra.')
    }

    const data = mapperCollectGetById(collect)

    return {
      data,
    }
  }

  async getInProgressByUserId(id: number) {
    const collect = await this.collectRepository.getInProgressByUserId(id)

    if (!collect) {
      throw new NotFoundError('Informações sobre a coleta não encontra.')
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

    const statusSplited = status.split(',')

    const statusMapped = statusSplited.map((item) => {
      return Number(item)
    })

    const list = await this.collectRepository.getCollectsByCollector({
      offset,
      perPage,
      status: statusMapped,
      ordernation,
      search,
    })

    const totalRows =
      await this.collectRepository.getTotalRowsCollectsByCollector(
        statusMapped,
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

  // Busca a lista de Solicitações(Coletas) em progresso pertencentes ao Coletor
  async getCollectsInProcessByCollector({
    id,
    page,
    perPage,
    status,
    ordernation,
    search,
  }: IRequestGetCollectsInProcessByCollector) {
    const offset = (page - 1) * perPage

    const statusSplited = status.split(',')

    const statusMapped = statusSplited.map((item) => {
      return Number(item)
    })

    const list = await this.collectRepository.getCollectsInProcessByCollector({
      id,
      offset,
      perPage,
      status: statusMapped,
      ordernation,
      search,
    })

    const totalRows =
      await this.collectRepository.getTotalRowsCollectsInProcessByCollector(
        id,
        statusMapped,
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
