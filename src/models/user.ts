import mongoose from "mongoose";

const { Schema } = mongoose;

export const userSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  emaiId: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
  },
});

export const User = mongoose.model("User",userSchema)
