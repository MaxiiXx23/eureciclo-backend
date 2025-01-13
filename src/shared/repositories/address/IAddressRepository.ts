import { TAddress, TCreateAddress, TUpdateAddress } from '@/@types/TAddress'

export interface IAddressRepository {
  create(data: TCreateAddress): Promise<TAddress>
  update(data: TUpdateAddress): Promise<TAddress>
  getByUserId(id: number): Promise<TAddress | null>
  getByCompanyId(id: number): Promise<TAddress | null>
}
