import { AddressService } from '../services/AddressService'
import { PrismaAddressRepository } from '@/shared/repositories/address/prisma/PrismaAddressRepository'
import {
  IRequestCreateAddress,
  IRequestUpdateAddress,
} from '@/interfaces/address/request'

export class AddressUseCase {
  private addressService: AddressService

  constructor() {
    this.addressService = new AddressService(new PrismaAddressRepository())
  }

  async create(data: IRequestCreateAddress) {
    return await this.addressService.create(data)
  }

  async update(data: IRequestUpdateAddress) {
    return await this.addressService.update(data)
  }

  async getByUserId(id: number) {
    return await this.addressService.getByUserId(id)
  }

  async getByCompanyId(id: number) {
    return await this.addressService.getByCompanyId(id)
  }
}
