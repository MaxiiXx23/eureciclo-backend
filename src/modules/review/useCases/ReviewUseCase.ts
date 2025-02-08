import { PrismaReviewRepository } from '@/shared/repositories/review/prisma/PrismaReviewRepository'
import { ReviewService } from '../services/ReviewService'
import { ICreateReview } from '@/interfaces/review/repository'

export class ReviewUseCase {
  private reviewService: ReviewService

  constructor() {
    this.reviewService = new ReviewService(new PrismaReviewRepository())
  }

  async create(data: ICreateReview) {
    return await this.reviewService.create(data)
  }
}
