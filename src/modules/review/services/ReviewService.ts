import { ICreateReview } from '@/interfaces/review/repository'
import { IReviewRepository } from '@/shared/repositories/review/IReviewRepository'

export class ReviewService {
  constructor(private reviewRepository: IReviewRepository) {}

  async create(data: ICreateReview) {
    const review = await this.reviewRepository.create(data)

    if (data.reviewedUserId && data.collectId) {
      const userStats = await this.reviewRepository.getUserReviewStats(
        data.reviewedUserId,
      )

      await this.reviewRepository.patchRatingReviewedUser(
        data.reviewedUserId,
        Number(userStats.average.toFixed(1)),
      )
    }

    return {
      review,
    }
  }
}
