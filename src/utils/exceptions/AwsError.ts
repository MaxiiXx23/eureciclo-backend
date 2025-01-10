export class AwsError {
  code: number | undefined
  message: string
  constructor(code: number | undefined, message: string) {
    this.code = code
    this.message = message
  }
}
