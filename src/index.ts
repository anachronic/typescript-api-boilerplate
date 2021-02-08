import { createExpressServer } from "routing-controllers";

import "./startup";

const app = createExpressServer({
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
});

app.listen(process.env.PORT || 8080, () => {
  console.log("started");
});
