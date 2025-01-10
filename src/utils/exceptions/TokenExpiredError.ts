import { APIError } from './APIError'

export class TokenExpiredError extends APIError {
  constructor(message: string) {
    super(498, message)
  }
}
