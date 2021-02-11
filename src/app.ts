import './startup'

import morgan from 'morgan'
import { createExpressServer } from 'routing-controllers'
import { WinstonStream } from './logging'
import swaggerUi from 'swagger-ui-express'
import { OpenAPIService } from './schema'
import { Container } from 'typescript-ioc'

export const app = createExpressServer({
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
  middlewares: [`${__dirname}/middleware/**/*.{js,ts}`],
})

if (process.env.NODE_ENV !== 'test') {
  // Don't user request logger in test
  app.use(morgan('combined', { stream: new WinstonStream() }))
}
}
