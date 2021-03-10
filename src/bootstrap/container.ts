import { useContainer as useContainerForCV } from 'class-validator'
import { useContainer } from 'routing-controllers'
import { Container } from 'typescript-ioc'
import { pool } from '../database'

export function bootstrapContainer() {
  // Register typescript-ioc
  useContainer(Container)
  useContainerForCV(Container)

  // Create a pool injectable
  Container.bindName('db').to(pool)
}
