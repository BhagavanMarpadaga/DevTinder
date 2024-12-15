import { Request } from "express";
import { Document, Types } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  emaiId: string;
  password: string;
  age?: string; // Optional because `min` constraints won't enforce existence
  gender?: "Male" | "Female" | "Other"; // Enum constraint
  photoUrl?: string; // Optional field
  about?: string; // Optional field,
  skills: Array<string>;
  getJWT(): Promise<string>;
  validatePassword(inputPassword: string): Promise<boolean>;
}


export interface IConnectionRequest extends Document {
    fromUserId: Types.ObjectId;
    toUserId: Types.ObjectId;
    status: "ignored" | "interested" | "accepted" | "rejected";
    createdAt?: Date; // Automatically added by Mongoose `timestamps`
    updatedAt?: Date; // Automatically added by Mongoose `timestamps`
}

export interface AuthenticatedUser extends Request {
  user?: IUser;
}
