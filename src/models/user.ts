import mongoose from "mongoose";
import {IUser } from "../types"
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import 'dotenv/config'
const { Schema } = mongoose;


export interface IUserInput {
  firstName: string;
  lastName: string;
  emaiId: string;
  password: string;
  age?: string; // Optional because `min` constraints won't enforce existence
  gender: "Male" | "Female" | "Other"; // Enum constraint
  photoUrl?: string; // Optional field
  about?: string; // Optional field
  skills:Array<string>
}

export const userSchema = new Schema<IUser>(
  {
    firstName: {
      type: String,
      min: 4,
      max: 40,
      required: true,
    },
    lastName: {
      type: String,
      min: 4,
      max: 40,
      required: true,
    },
    emaiId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      min: 8,
      validate(value: string) {
        if (value.length < 0) {
          throw new Error("Password can not be empty");
        }
      },
    },
    age: {
      type: String,
      min: 18,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"]
    },
    photoUrl: {
      type: String,
    },
    about: {
      type: String,
    },
    skills:{
      type:[String]
    }
  },
  { timestamps: true }
);


userSchema.methods.getJWT =async function(){
  const token = await jwt.sign(
        {
          _id: this._id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: 60 * 60 }
      );
    return token;
}
userSchema.methods.validatePassword = async function(inputPassword:string){
  const hash = this.password
  const isPasswordMatched = await bcrypt.compare(inputPassword, hash);
  return isPasswordMatched
}


export const User = mongoose.model<IUser>("User", userSchema);
