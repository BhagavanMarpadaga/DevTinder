import express from "express";
import { DBConnect } from "./config/database";

const app = express();

DBConnect()
  .then(() => {
    
    app.listen(8000, () => {
      console.log("listing on port ", 8000);
    });
  })
  .catch((err: Error) => {
    console.log("Error while conneting to DB", err);
  });


