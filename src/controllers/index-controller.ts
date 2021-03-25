import { Get, JsonController } from 'routing-controllers'
import { ResponseSchema } from 'routing-controllers-openapi'
import { Inject } from 'typescript-ioc'
import { OpenAPIService } from '../schema'
import { Welcome } from '../schema/index-schema'

@JsonController()
export class IndexController {
  @Inject
  private openApiService: OpenAPIService

  @Get('/')
  @ResponseSchema(Welcome)
  async index() {
    return {
      app: 'Your app name here 🚀',
    }
  }

  @Get('/schema')
  async schema() {
    return this.openApiService.getSpec()
  }
}
