import { Request, Response } from 'express'
import {
  ExpressErrorMiddlewareInterface as ErrorMiddleware,
  HttpError,
  Middleware,
} from 'routing-controllers'
import { InjectValue } from 'typescript-ioc'
import { Logger } from 'winston'

@Middleware({ type: 'after', priority: 0 })
export class ErrorHandlingMiddleware implements ErrorMiddleware {
  @InjectValue('logger')
  private logger: Logger

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

  error(error: any, request: Request, response: Response): void {
    if (error.httpCode) {
      response.status(error.httpCode)
    } else {
      response.status(500)
    }

    // send error content
    response.json(this.processJsonError(error))

    throw error
  }
}
