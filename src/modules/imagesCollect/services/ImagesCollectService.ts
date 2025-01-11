import { IImagesCollectRepository } from '@/shared/repositories/imagesCollect/IImagesCollectRepository'
import { IRequestCreateImagesCollect } from '@/interfaces/imagesCollect'

export class ImagesCollectService {
  constructor(private imagesCollectRepository: IImagesCollectRepository) {}

  async create({ collectId, file }: IRequestCreateImagesCollect) {
    const key = `${file.filename}`

    const createdAttachment = await this.imagesCollectRepository.create({
      url: key,
      size: file.size,
      type: file.mimetype,
      collectId,
    })

    return {
      createdAttachment,
    }
  }
}
