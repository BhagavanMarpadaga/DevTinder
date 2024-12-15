import express ,{Response}from "express";
import { userAuthMiddleware } from "../../../middleware/userAuthMiddleWare";

import { User } from "../../../models/user";
import { profileUpdateValidationSchema } from "../../../utils/validations"
import { AuthenticatedUser,IUser } from "../../../types"
import { ZodError } from "zod";
const profileRouter = express.Router();


profileRouter.get("/view", async (req:AuthenticatedUser, res:Response) => {
  try {

    if(!req.user){
      throw new Error("User not found");
    }
    res.json({ user: req?.user });
  } catch (err) {
    if (err instanceof ZodError) {
      console.log(err.flatten());
    }
    console.log("error is ", err);
    res.send("Something went wrong");
  }
});

profileRouter.post("/edit", async (req:AuthenticatedUser, res:Response) => {
  try {
    if(!req.user){
      throw new Error("User not found");
    }
    profileUpdateValidationSchema.parse(req.body)
    const user = req.user
    console.log("user boyd is ",req.body)
    const reqBody:Partial<IUser> = req.body
    Object.keys(reqBody).forEach((userProp)=>{
      // const key = userProp as keyof IUser
      user[userProp as keyof IUser] =req.body[userProp] as never
    })
    const userRes =await user.save()   
    console.log("user res ",userRes) 
    res.json({ user: req?.user });
  } catch (err) {
    if (err instanceof ZodError) {
      const error = err.flatten();
      res.status(404).send(JSON.stringify(error));
    } else {
      console.log(err);
      res.status(500).send("some thing went wrong");
    }
  }
});

profileRouter.get("/profiles", userAuthMiddleware, async (req, res) => {
  try {
    const cookie = req.cookies;
    console.log("cookie is  ", cookie);
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
});

export default profileRouter;
