import { APIError } from './APIError'

export class ConflitError extends APIError {
  constructor(message: string) {
    super(409, message)
  }
}
