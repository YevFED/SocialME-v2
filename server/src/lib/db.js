import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const dbconnect = await mongoose.connect(process.env.MONGODBURL);
    console.log(`DB connectd to ${dbconnect.connection.host}`);
  } catch (error) {
    console.log("DB connection err :" + error);
  }
};
