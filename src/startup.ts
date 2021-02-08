import { useContainer as useContainerForCV } from "class-validator";
import { useContainer } from "routing-controllers";
import { Container } from "typescript-ioc";
import winston from "winston";
import { pool } from "./database";

// Do NOT export anything from this file

// Register typescript-ioc
useContainer(Container);
useContainerForCV(Container);

// Create a pool injectable
Container.bindName("db").to(pool);

// Create a logger injectable
const logger = winston.createLogger({
  level: "info",
  transports: [new winston.transports.Console()],
});
Container.bindName("logger").to(logger);
