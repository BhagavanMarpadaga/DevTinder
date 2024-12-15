import express from "express";
import { DBConnect } from "./config/database";

import cookieParser from "cookie-parser";
import apiRouter from "./routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", apiRouter);

DBConnect()
  .then(() => {
    app.listen(8000, () => {
      console.log("listing on port ", 8000);
    });
  })
  .catch((err: Error) => {
    console.log("Error while conneting to DB", err);
  });
