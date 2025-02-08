import { Request, Response, NextFunction } from 'express'
import { ReviewUseCase } from '../useCases/ReviewUseCase'
import { ICreateReview } from '@/interfaces/review/repository'

export class ReviewController {
  private reviewUseCase: ReviewUseCase

  constructor() {
    this.reviewUseCase = new ReviewUseCase()
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const {
        rating,
        comment,
        collectId,
        companyId,
        reviewedUserId,
      }: Omit<ICreateReview, 'userId'> = req.body
      const { id } = req.userAuth

      await this.reviewUseCase.create({
        userId: id,
        rating,
        collectId,
        comment,
        companyId,
        reviewedUserId,
      })

      return res.status(201).json({
        message: 'Avaliação enviada com sucesso!',
      })
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({
          message: 'Erro inesperado. Por favor, recarregue novamente a página.',
        })
      }

      return next(error)
    }
  }
}
