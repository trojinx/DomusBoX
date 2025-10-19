import mongoose from "mongoose";
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`connected to DB successfully`);
  } catch (e) {
    console.log(`error in db.config.js, while trying to connect to DB: ${e}`);
  }
}
export default connectDB;
