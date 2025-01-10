import { APIError } from './APIError'

export class InternalServerError extends APIError {
  constructor(message: string) {
    super(500, message)
  }
}
