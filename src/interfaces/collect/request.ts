import { TCreateCollect } from '@/@types/TCollect'

interface IRequestCreateCollect extends Omit<TCreateCollect, 'code'> {
  file: Express.Multer.File
}

export { IRequestCreateCollect }
