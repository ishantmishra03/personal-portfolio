import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected successfully ✔");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/portfolio`);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
