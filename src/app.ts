import Koa from 'koa'
import { useKoaServer } from 'routing-controllers'
import { bootstrapContainer } from './bootstrap/container'
import { bootstrapLogging } from './bootstrap/logging'
import { bootstrapSwaggerUi } from './bootstrap/swagger-ui'

bootstrapContainer()

const app: Koa = new Koa()

bootstrapLogging(app)

useKoaServer(app, {
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
  middlewares: [`${__dirname}/middleware/**/*.{js,ts}`],
})

bootstrapSwaggerUi(app)

export { app }
