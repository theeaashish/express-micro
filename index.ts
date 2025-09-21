import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// import routes
import ApiRoutes from "./routes/api.ts";
app.use("/api", ApiRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
