import express from "express";

const app = express();

app.get("/", async (req, res) => {
  res.send({
    hehe: "haha",
  });
});

app.listen(3001);
