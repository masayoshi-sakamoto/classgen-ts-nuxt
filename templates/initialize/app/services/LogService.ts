import { Context } from '@nuxt/types/app'
import { APIError } from '@/infrastructure/network/APIError'

export default class LogService {
  constructor(protected ctx: Context, protected logger: any) {}

  handle(exception: APIError) {
    if (exception.statusCode === 401) {
      this.ctx.redirect('/')
    } else if (exception.statusCode === 422 || exception.statusCode === 429) {
      this.ctx.App.data.errors = exception.errors
    } else if (exception.statusCode === 404) {
      this.ctx.error(exception)
    } else {
      this.logger.captureException(exception)
      this.ctx.error(exception)
    }
  }
}
