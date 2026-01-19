import mongoose from "mongoose";

export const connectDB = () => {
  try {
    const isConnected = mongoose.connect(process.env.MONGODB_URI);
    if (isConnected) {
      console.log("Database Connected");
    }
  } catch (error) {
    console.error(error);
  }
};
