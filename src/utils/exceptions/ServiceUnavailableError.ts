import { APIError } from './APIError'

export class ServiceUnavailableError extends APIError {
  constructor(message: string) {
    super(503, message)
  }
}
