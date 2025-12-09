import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://readWrite:sasa0917@cluster0.5rvim.mongodb.net/truestate_db"
    );
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Error:", err.message);
    process.exit(1);
  }
};
