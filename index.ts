import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
