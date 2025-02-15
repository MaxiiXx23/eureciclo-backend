import { TReview, TReviewStats } from '@/@types/TReview'
import { ICreateReview } from '@/interfaces/review/repository'

export interface IReviewRepository {
  create(data: ICreateReview): Promise<TReview>
  getUserReviewStats(userId: number): Promise<TReviewStats>
  getCompanyReviewStats(id: number): Promise<TReviewStats>

  patchRatingReviewedUser(userId: number, avg: number): Promise<void>
  patchRatingReviewedCompany(id: number, avg: number): Promise<void>
}
