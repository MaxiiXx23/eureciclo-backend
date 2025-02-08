interface ICreateReview {
  userId: number
  rating: number
  comment?: string
  reviewedUserId?: number
  collectId?: number
  companyId?: number
}

export { ICreateReview }
