import { Express } from 'express'

interface IRequestCreateImagesCollect {
  collectId: number
  file: Express.Multer.File
}

export { IRequestCreateImagesCollect }
