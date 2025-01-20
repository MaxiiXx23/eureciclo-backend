import { IRequestPagination } from '../globals'

interface IRequestGtSearchCollectorsToCompany
  extends Omit<IRequestPagination, 'status'> {}

export { IRequestGtSearchCollectorsToCompany }
