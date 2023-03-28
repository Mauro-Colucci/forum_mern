import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", true);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to ${conn.connection.name} db`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
