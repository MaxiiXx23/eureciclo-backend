import { APIError } from './APIError'

export class PrismaError extends APIError {
  constructor(code: string, cause: string) {
    super(503, `${cause}`)
  }
}

export class ClassPrismaError {
  code: string
  meta: {
    cause: string
  }

  constructor(code: string, cause: string) {
    this.code = code
    this.meta = {
      cause,
    }
  }
}
