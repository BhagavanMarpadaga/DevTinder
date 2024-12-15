import express ,{Response}from "express";

import { AuthenticatedUser } from "../../../types";
import { ZodError } from "zod";
import { connectionValidationSchema } from "../../../utils/validations";
const connectionRequestRouter = express.Router();
import ConnectionRequest from "../../../models/ConnectionRequest";

connectionRequestRouter.post("/send/:status/:toUserId", async (req:AuthenticatedUser, res:Response) => {
  try {
    if (!req.user) {
      throw new Error("User not found");
    }
    //validation the request coming
    const fromUserId = (req.user._id as object).toString();
    const status = req.params.status
    const toUserId = req.params.toUserId
    const reqObj ={
        fromUserId:fromUserId,
        toUserId:toUserId,
        status:status
    }
    connectionValidationSchema.parse(reqObj)
    //create connection in DB
    const newConnection = new ConnectionRequest(reqObj)
    const resData = await newConnection.save();
    res.json({message:resData})

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

export default connectionRequestRouter;
