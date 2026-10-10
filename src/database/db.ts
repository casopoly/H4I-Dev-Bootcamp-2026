import mongoose from "mongoose";

const url: string = process.env.MONGO_URI as string;
let connection: typeof mongoose;

/**
 * Makes a connection to a MongoDB database. If a connection already exists, does nothing
 * Call this function before all api routes
 * @returns {Promise<typeof mongoose>}
 */
const connectDB = async () => {
  if (!connection) {
    // Give up after 5 seconds if the database can't be reached (the default is 30), so the visitor
    // sees the error page quickly instead of a page that spins for half a minute
    connection = await mongoose.connect(url, { serverSelectionTimeoutMS: 5000 });
  }
  return connection;
};

export default connectDB;
