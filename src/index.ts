import { createExpressServer } from "routing-controllers";

const app = createExpressServer({
  controllers: [`${__dirname}/controllers/**/*.{js,ts}`],
});

app.listen(3001, () => {
  console.log("started");
});
