import dotenv from "dotenv";

import mongoose from "mongoose";
dotenv.config();

export const connectDB = async () => {
  try {
    const isConnected = mongoose.connect(process.env.MONGODB_URI);
    if (isConnected) {
      console.log("Auth Database Connected");
    }
  } catch (error) {
    console.error(error);
    return;
  }
};