import mongoose from "mongoose";

export interface messages extends mongoose.Document {
  _id: string;
  senderId: string;
  reciverId: string;
  message: string;
  seen: boolean;
}