import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface as ErrorMiddleware, Middleware } from 'routing-controllers'
import { InjectValue } from 'typescript-ioc'
import { Logger } from 'winston'

@Middleware({ type: 'after', priority: 0 })
export class ErrorHandlingMiddleware implements ErrorMiddleware {
  @InjectValue('logger')
  private logger: Logger

  error(err: Error, req: Request, res: Response): void {
    const stackList = err.stack?.split('\n')
    this.logger.error(stackList || [])

    res.status(500)
    const response: Record<string, any> = {
      message: err.message,
      name: err.name,
    }

    if (process.env.NODE_ENV !== 'production') {
      response['trace'] = stackList || []
    }

    res.json(response)
  }
}
