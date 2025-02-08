interface TReview {
  id: number
  userId: number
  rating: number
  comment: string | null
  reviewedUserId: number | null
  collectId: number | null
  companyId: number | null
  createdAt: Date
  updatedAt: Date
}

interface TReviewStats {
  average: number
  totalReviews: number
}

export { TReview, TReviewRating, TReviewStats }
