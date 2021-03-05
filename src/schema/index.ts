import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { Singleton } from 'typescript-ioc'
import { defaultMetadataStorage } from 'class-transformer/storage'

type OpenAPIObject = ReturnType<typeof validationMetadatasToSchemas>

function generateApiSpec() {
  const storage = getMetadataArgsStorage()
  const schemas = validationMetadatasToSchemas({
    classTransformerMetadataStorage: defaultMetadataStorage,
    refPointerPrefix: '#/components/schemas/',
  })
  const spec = routingControllersToSpec(storage, undefined, {
    components: { schemas },
    info: {
      title: 'A test API with routing-controllers, openapi, zapatos and migrate. Go typescript!',
      version: '0.0.1',
    },
  })

  return spec
}

@Singleton
export class OpenAPIService {
  spec?: OpenAPIObject

  public getSpec(): OpenAPIObject {
    if (!this.spec) {
      this.spec = generateApiSpec()
    }

    return this.spec
  }
}
