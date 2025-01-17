import { IPagination } from '../globals'

interface IGetSearchCompaniesToCollector extends Omit<IPagination, 'status'> {}

export { IGetSearchCompaniesToCollector }
