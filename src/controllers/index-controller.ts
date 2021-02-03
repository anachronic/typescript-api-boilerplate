import { Controller, Get } from "routing-controllers";

@Controller("/")
export class IndexController {
  @Get("/")
  async index() {
    return {
      app: "Your app name here 🚀",
    };
  }
}
