export interface IGetItemPostDTO {
  id: number
  title: string
  urlImage: string
}

export interface IGetPostDTO {
  id: number
  title: string
  description: string
  createdAt: Date
  file: string
}
