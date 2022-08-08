import mongoose from "mongoose";

export interface User extends mongoose.Document {
  _id: string;
  username: string;
  email: string;
  password: string;
}