import express from "express";
import dotenv from "dotenv";
import path from "node:path";
const app = express();
app.use(express.json());
dotenv.config();

app.get("/test", (req, res) => {
  res.status(200).send("test success");
});

app.get("/download", (req, res) => {
  res.download(); // TODO: Add executable path
});

app.listen(process.env.PORT, () => {
  console.log(`server started`);
});
