import mongoose from "mongoose";

export const initDB = async (): Promise<boolean> => {
  return await new Promise((resolve, reject) => {
    const mongodbUri = process.env.MONGODB_URI ?? "";
    console.log(mongodbUri, "helo")

    if (mongodbUri === "") throw new Error("mongod db uri not found!");
    mongoose.set("debug", true);
    mongoose.set("strictQuery", false);
    mongoose
      .connect(mongodbUri)
      .then(() => {
        console.log("DB Connected!");
        resolve(true);
      })
      .catch(reject);
  });
};


/**
 * Initializes the MongoDB connection using the URI from environment variables.
 * Sets mongoose debug mode and connects to the database.
 * @returns {Promise<boolean>} A promise that resolves to true if the connection is successful.
 * @throws {Error} Throws an error if the MongoDB URI is not found.
 */