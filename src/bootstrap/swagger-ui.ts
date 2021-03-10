import Koa from 'koa'
import { koaSwagger } from 'koa2-swagger-ui'
import { OpenAPIService } from '../schema'
import { Container } from 'typescript-ioc'
import { settings } from '../conf/settings'

export function bootstrapSwaggerUi(app: Koa) {
  if (!settings.isDev) {
    return
  }

  const openApiService: OpenAPIService = Container.get(OpenAPIService)

  app.use(koaSwagger({ swaggerOptions: { spec: openApiService.getSpec() } }))
}
