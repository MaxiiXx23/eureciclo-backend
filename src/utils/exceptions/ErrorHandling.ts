import { APIError } from './APIError'
import { BadRequestError } from './BadRequestError'
import { InternalServerError } from './InternalServerError'
import { NotFoundError } from './NotFoundError'

export class ErrorHandling {
  static async handleAsyncError<T>(
    func: () => Promise<T>,
  ): Promise<T | APIError> {
    try {
      return await func()
    } catch (error) {
      if (
        error instanceof NotFoundError ||
        error instanceof InternalServerError ||
        error instanceof BadRequestError
      ) {
        throw error
      }

      const errorMessage = 'Erro ao criar uma empresa: ' + error + ' '
      return new InternalServerError(errorMessage)
    }
  }
}
