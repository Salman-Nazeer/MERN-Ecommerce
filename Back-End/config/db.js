import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

export default connectDB;
