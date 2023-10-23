export interface APIError {
  statusCode?: number
  message: string
  data?: string
  errors: any[]
  raw: Error
}
