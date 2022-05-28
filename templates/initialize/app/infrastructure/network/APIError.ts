export interface APIError {
  message: string
  statusCode: number | undefined
  errors: any[]
  raw: Error
}
