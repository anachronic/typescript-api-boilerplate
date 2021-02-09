import "source-map-support/register";

import { app } from "./app";

app.listen(process.env.PORT || 8080, () => {
  console.log("started");
});
