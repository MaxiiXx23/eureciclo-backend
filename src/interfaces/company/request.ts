import { IRequestPagination } from '../globals'

interface IRequestGetSearchCompaniesToCollector
  extends Omit<IRequestPagination, 'status'> {}

export { IRequestGetSearchCompaniesToCollector }
