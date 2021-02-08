import { Container } from "typescript-ioc";
import { Logger } from "winston";

const logger: Logger = Container.getValue("logger");

export class WinstonStream {
  write(message: string): void {
    logger.info(message);
  }
}
