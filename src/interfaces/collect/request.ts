import { TCreateCollect } from '@/@types/TCollect'

interface IRequestCreateCollect extends Omit<TCreateCollect, 'code'> {}

export { IRequestCreateCollect }
