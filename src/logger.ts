import pino from 'pino'
import { Container } from 'typescript-ioc'
import { settings } from './conf/settings'

export function getLogger(loggerName: string) {
  const defaultLogLevel: string = Container.getValue('defaultLogLevel')
  const baseLogger = pino({
    level: defaultLogLevel,
    prettyPrint: settings.isProd ? false : { colorize: true },
    redact: {
      censor: '** Authorization headers hidden **',
      paths: ['res.headers["set-cookie"]', 'req.headers.cookie', 'req.headers.authorization'],
    },
  })

  return baseLogger.child({
    name: loggerName,
  })
}
