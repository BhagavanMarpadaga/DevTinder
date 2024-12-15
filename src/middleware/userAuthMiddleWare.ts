import  'dotenv/config'

import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { User } from "../models/user";
import {AuthenticatedUser} from "../types"




export const userAuthMiddleware = async (
  req: AuthenticatedUser,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { cookies } = req;
    const token = cookies?.token;

    if (!token) {
      res.status(401).send({ error: "No token provided" });
      return;
    }
    console.log("jwt is ",process.env.JWT_SECRET)
    
    const payload = await jwt.verify(token, process.env.JWT_SECRET as string);
    if (typeof payload === "object" && payload !== null && "_id" in payload) {
      const userId = (payload as JwtPayload)._id;
      const user = await User.findOne({ _id: userId }).select({ password: 0 });
      if (!user) {
        throw new Error("User not found");  
      }
      req.user = user;
    }

    console.log("Token verified");
    next();
  } catch (err) {
    res.status(500).send({ error: "Token verification failed", details: err });
  }
};
