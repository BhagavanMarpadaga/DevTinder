import mongoose from "mongoose";
import { IConnectionRequest } from "../types";



const connectionRequestSchema = new mongoose.Schema<IConnectionRequest>(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      mandatory: true,
      ref:"User"
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      mandatory: true,
      ref:"User"
    },
    status: {
      type: String,
      enum: ["ingnored", "interested", "accepted", "rejected"],
      mandatory:true
    },
  },
  {
    timestamps: true,
  }
);
connectionRequestSchema.pre("save",function(next){
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("From and To should not be same")
    }
    next()
})
connectionRequestSchema.index({"fromUserId":1,"toUserId":1})

const ConnectionRequest = mongoose.model('ConnectionRequest',connectionRequestSchema);
export default ConnectionRequest

