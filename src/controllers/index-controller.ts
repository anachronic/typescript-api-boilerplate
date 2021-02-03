import {
  Get,
  getMetadataArgsStorage,
  JsonController,
} from "routing-controllers";
import {
  ResponseSchema,
  routingControllersToSpec,
} from "routing-controllers-openapi";
import { Welcome } from "../schema/index-schema";

@JsonController()
export class IndexController {
  @Get("/")
  @ResponseSchema(Welcome)
  async index() {
    return {
      app: "Your app name here 🚀",
    };
  }

  @Get("/schema")
  async schema() {
    const storage = getMetadataArgsStorage();

    const x = routingControllersToSpec(storage);
    return x;
  }
}
