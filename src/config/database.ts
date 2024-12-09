import mongoose from "mongoose";
import 'dotenv/config'

export const DBConnect = async () => {
   
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log("Connected to DB")

};
