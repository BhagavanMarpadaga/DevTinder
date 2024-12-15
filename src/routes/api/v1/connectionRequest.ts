import express, { Response } from "express";

import { AuthenticatedUser } from "../../../types";
import { ZodError } from "zod";
import { requestValidationSchema } from "../../../utils/validations";
const connectionRequestRouter = express.Router();
import ConnectionRequest from "../../../models/ConnectionRequest";
import { User } from "../../../models/user";

connectionRequestRouter.post(
  "/send/:status/:toUserId",
  async (req: AuthenticatedUser, res: Response) => {
    try {
      if (!req.user) {
        throw new Error("User not found");
      }
      //validation the request coming
      const fromUserId = (req.user._id as object).toString();
      const status = req.params.status;
      const toUserId = req.params.toUserId;
      const reqObj = {
        fromUserId: fromUserId,
        toUserId: toUserId,
        status: status,
      };
      requestValidationSchema.parse(reqObj);

      //check if the connection is already present from to To (or) To to From
      const isConnectionExists = await ConnectionRequest.find({
        $or: [
          {
            fromUserId,
            toUserId,
          },
          {
            fromUserId: toUserId,
            toUserId: fromUserId,
          },
        ],
      });
      if(isConnectionExists.length>0){
        console.log("is connetion exists ",isConnectionExists)
        throw new Error("Connection can not be made as it is already present")
      }

      const toUser = await User.findById(toUserId)
      console.log("to user is ",toUser)
      if(!toUser){
        throw new Error("You are trying to connect with invalid user")
      }

      //create connection in DB
      const newConnection = new ConnectionRequest(reqObj);
      const resData = await newConnection.save();
      res.json({ message: resData });
    } catch (err) {
      if (err instanceof ZodError) {
        const error = err.flatten();
        res.status(404).send(JSON.stringify(error));
      } else if(err instanceof Error){
        console.log(err);
        res.status(404).send(`${err.message}`);
      }else{
        res.status(500).send(`Something went wrong`);
      }
    }
  }
);

export default connectionRequestRouter;
