import "source-map-support/register";

import { createExpressServer } from "routing-controllers";
import morgan from "morgan";
import "./startup";
import { WinstonStream } from "./logging";

const app = createExpressServer({
  defaultErrorHandler: false,
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
  middlewares: [`${__dirname}/middleware/**/*.{js,ts}`],
});

app.use(morgan("combined", { stream: new WinstonStream() }));

app.listen(process.env.PORT || 8080, () => {
  console.log("started");
});
