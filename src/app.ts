import express from "express";
import { DBConnect } from "./config/database";
import { IUserInput, User } from "./models/user";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.post("/user", async (req, res) => {
  try {
    console.log("body is ",req.body['firstName'])
    // const user = new User<IUserInput>(req.body);
    // await user.save();
    // await User.findOneAndUpdate({firstName:"bhagavan"},{lastName:"M"},)
    res.send("created successfully");
  } catch (err) {
    console.log("error is ", err);
  } 
});

DBConnect()
  .then(() => {
    app.listen(8000, () => {
      console.log("listing on port ", 8000);
    });
  })
  .catch((err: Error) => {
    console.log("Error while conneting to DB", err);
  });
