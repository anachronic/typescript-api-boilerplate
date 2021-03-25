import Koa from 'koa'
import koaPinoLogger from 'koa-pino-logger'
import { getLogger } from '../logger'

export function bootstrapLogging(app?: Koa) {
  if (app) {
    app.use(
      koaPinoLogger({
        logger: getLogger('http'),
        customLogLevel: (res) => {
          if (res.statusCode >= 500) {
            return 'error'
          } else if (res.statusCode >= 400) {
            return 'warn'
          }

          return 'info'
        },
      })
    )
  }
}
