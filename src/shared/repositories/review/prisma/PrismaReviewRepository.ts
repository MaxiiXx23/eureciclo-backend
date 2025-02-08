import { TReview, TReviewStats } from '@/@types/TReview'
import { ICreateReview } from '@/interfaces/review/repository'
import { IReviewRepository } from '../IReviewRepository'
import { prismaProvider } from '@/shared/providers'

export class PrismaReviewRepository implements IReviewRepository {
  async create(data: ICreateReview): Promise<TReview> {
    const createdData = await prismaProvider.queryDatabase((prisma) =>
      prisma.review.create({
        data,
      }),
    )

    return createdData
  }

  async getUserReviewStats(userId: number): Promise<TReviewStats> {
    const result = await prismaProvider.queryDatabase((prisma) =>
      prisma.review.aggregate({
        where: { reviewedUserId: userId },
        _avg: { rating: true },
        _count: { rating: true },
      }),
    )

    return {
      average: result._avg.rating || 0,
      totalReviews: result._count.rating,
    }
  }

  async patchRatingReviewedUser(userId: number, avg: number): Promise<void> {
    await prismaProvider.queryDatabase((prisma) =>
      prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          rating: avg,
        },
      }),
    )
  }
}
