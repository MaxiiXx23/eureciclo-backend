import { IAddressRepository } from '@/shared/repositories/address/IAddressRepository'
import {
  IRequestCreateAddress,
  IRequestUpdateAddress,
} from '@/interfaces/address/request'

export class AddressService {
  constructor(private addressRepository: IAddressRepository) {}

  async create(data: IRequestCreateAddress) {
    const addressCreated = await this.addressRepository.create(data)

    return {
      addressCreated,
    }
  }

  async update(data: IRequestUpdateAddress) {
    const addressCreated = await this.addressRepository.update(data)

    return {
      addressCreated,
    }
  }

  async getByUserId(id: number) {
    const address = await this.addressRepository.getByUserId(id)

    return {
      address,
    }
  }

  async getByCompanyId(id: number) {
    const address = await this.addressRepository.getByCompanyId(id)

    return {
      address,
    }
  }
}
