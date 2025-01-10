import { randomUUID } from 'crypto'
import { Express } from 'express'

interface IGeneratePaths {
  file: Express.Multer.File
}

export function generatePath({ file }: IGeneratePaths): string {
  const splitedOriginalName = file.originalname.split('.')
  const extension = splitedOriginalName[splitedOriginalName.length - 1]

  if (
    extension === 'docx' ||
    extension === 'pptx' ||
    extension === 'xlsx' ||
    extension === 'zip'
  ) {
    const path = `${randomUUID()}.${splitedOriginalName[splitedOriginalName.length - 1]}`
    return path
  }

  // Aqui fiz uma modificação para concaterna a extensão, porém, no AWS não pode fazer isso
  const path = `${randomUUID()}.${extension}`

  return path
}
