export interface TImagesCollect {
  id: number
  url: string
  size: number
  type: string
  collectId: number
  createdAt: Date
  updatedAt: Date
}

export interface TCreateImagesCollect {
  url: string
  size: number
  type: string
  collectId: number
}
