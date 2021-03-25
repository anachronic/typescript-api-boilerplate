import { useContainer as useContainerForCV } from 'class-validator'
import { useContainer } from 'routing-controllers'
import { Container } from 'typescript-ioc'
import { settings } from '../conf/settings'
import { pool } from '../database'

export function bootstrapContainer() {
  // Register typescript-ioc
  useContainer(Container)
  useContainerForCV(Container)

  // Set logging levels
  // test: fatal
  // development: debug
  // anything else(prod): info
  Container.bindName('defaultLogLevel').to(
    settings.isTest ? 'fatal' : settings.isDev ? 'debug' : 'info'
  )

  // Create a pool injectable
  Container.bindName('db').to(pool)
}
