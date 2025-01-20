import { IPagination } from '../globals'

interface IGetSearchCollectorsToCompany extends Omit<IPagination, 'status'> {}

export { IGetSearchCollectorsToCompany }
