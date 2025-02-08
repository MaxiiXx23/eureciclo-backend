import { TReview, TReviewStats } from '@/@types/TReview'
import { ICreateReview } from '@/interfaces/review/repository'

export interface IReviewRepository {
  create(data: ICreateReview): Promise<TReview>
  getUserReviewStats(userId: number): Promise<TReviewStats>

  patchRatingReviewedUser(userId: number, avg: number): Promise<void>
}
