export interface TPost {
  id: number
  title: string
  description: string
  type: number
  likes: number
  userId: number
  companyId: number | null
  createdAt: Date
  updatedAt: Date
}

export interface IGetItemPost {
  id: number
  title: string
  FilesPost: {
    id: number
    url: string
  }[]
}

export interface TGetPost {
  id: number
  title: string
  description: string
  createdAt: Date
  FilesPost: {
    id: number
    url: string
  }[]
}
