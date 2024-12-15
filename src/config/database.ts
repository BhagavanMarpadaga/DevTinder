import mongoose from "mongoose";
import 'dotenv/config'

export const DBConnect = async () => {
    console.log("key is ",process.env.JWT_SECRET)
    console.log("key is ",process.env.MONGO_URL)
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to DB")
};
