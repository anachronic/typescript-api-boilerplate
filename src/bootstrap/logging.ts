import Koa from 'koa'
import log4js from 'koa-log4'
import { settings } from '../conf/settings'

export function bootstrapLogging(app: Koa) {
  const logger = log4js.getLogger()
  logger.level = settings.isDev ? 'info' : 'debug'

  app.use(
    log4js.koaLogger(log4js.getLogger('http'), {
      level: 'auto',
    })
  )
}
