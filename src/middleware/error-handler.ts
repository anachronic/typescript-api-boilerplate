import { HttpError, KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context, Next } from 'koa'

@Middleware({ type: 'before', priority: 1000000000 })
export class ErrorHandlingMiddleware implements KoaMiddlewareInterface {
  private processJsonError(error: any) {
    if (typeof error.toJSON === 'function') return error.toJSON()

    const processedError: any = {}
    if (error instanceof Error) {
      const name = error.name && error.name !== 'Error' ? error.name : error.constructor.name
      processedError.name = name

      if (error.message) processedError.message = error.message
      if (error.stack && process.env.NODE_ENV !== 'production')
        processedError.stack = error.stack.split('\n')

      Object.keys(error)
        .filter(
          (key) =>
            key !== 'stack' &&
            key !== 'name' &&
            key !== 'message' &&
            (!(error instanceof HttpError) || key !== 'httpCode')
        )
        .forEach((key) => (processedError[key] = (error as any)[key]))

      return Object.keys(processedError).length > 0 ? processedError : undefined
    }

    return error
  }

  async use(context: Context, next: Next) {
    try {
      await next()
    } catch (error) {
      if (error.httpCode) {
        context.response.status = error.httpCode
      } else {
        context.response.status = 500
      }

      // send error content
      context.body = this.processJsonError(error)
    }
  }
}
