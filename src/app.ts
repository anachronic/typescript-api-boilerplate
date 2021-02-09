import "./startup";

import morgan from "morgan";
import { createExpressServer } from "routing-controllers";
import { WinstonStream } from "./logging";

export const app = createExpressServer({
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
  middlewares: [`${__dirname}/middleware/**/*.{js,ts}`],
});

app.use(morgan("combined", { stream: new WinstonStream() }));
