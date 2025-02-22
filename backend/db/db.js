import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectToDatabase = async () => {
  mongoose.connect(process.env.mongodb_API).then(() => {
    console.log("connected to mongodb");
  });
};

export default connectToDatabase;
