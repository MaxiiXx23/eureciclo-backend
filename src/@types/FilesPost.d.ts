interface TFilesPost {
  id: number
  url: string
  size: number
  type: string
  postId: number
  createdAt: Date
  updatedAt: Date
}

interface TCreateFilesPost {
  url: string
  size: number
  type: string
  postId: number
}

export { TFilesPost, TCreateFilesPost }
