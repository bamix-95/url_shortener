import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.error(
      "Error occurred while connecting to MONGO DB:",
      error.message,
    );
    process.exit(1);
  }
};

export default connectDatabase;
