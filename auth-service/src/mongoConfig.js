import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const isConnected = await mongoose.connect(process.env.MONGODB_URI);
    if (isConnected) {
      console.log("Auth Database Connected");
    }
  } catch (error) {
    console.error(error);
    return;
  }
};