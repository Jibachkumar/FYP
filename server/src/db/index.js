import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGO_URL}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !!! DB HOST:${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.log(`mongoDB connection failed:${error}`);
    process.exit(1); // provide node.js: current app running some url that is process
  }
};
