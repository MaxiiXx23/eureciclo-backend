export interface TProfileImage {
  id: number
  url: string
  size: number
  type: string
  userId: number | null
  companyId: number | null
  createdAt: Date
  updatedAt: Date
}
