import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", false);

  if (isConnected) {
    console.log("MongoDB is already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL || "", {
      dbName: "Ruwana_Admin",
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};
