import { APIError } from './APIError'

export class RisizeImageError extends APIError {
  constructor(message: string) {
    super(304, message)
  }
}
