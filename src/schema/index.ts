import { validationMetadatasToSchemas } from "class-validator-jsonschema";
import { getMetadataArgsStorage } from "routing-controllers";
import { routingControllersToSpec } from "routing-controllers-openapi";

export function generateApiSpec() {
  const storage = getMetadataArgsStorage();
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: "#/components/schemas",
  });
  const spec = routingControllersToSpec(storage, undefined, {
    components: { schemas },
    info: {
      title:
        "A test API with routing-controllers, openapi, zapatos and migrate. Go typescript!",
      version: "0.0.1",
    },
  });

  return spec;
}
