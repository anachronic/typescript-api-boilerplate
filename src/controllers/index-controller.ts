import { Get, JsonController } from "routing-controllers";
import { ResponseSchema } from "routing-controllers-openapi";
import { generateApiSpec } from "../schema";
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
    return generateApiSpec();
  }
}
