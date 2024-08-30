import mongoose from "mongoose"
import { db_name } from "./constants.js"

const connectDB = async() => {
  try {    
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${db_name}`) // mongoose gives res when req is done
    console.log(`>>> MongoDB connected !! DB host: ${connectionInstance.connection.host}`); // read connectionInstance of MongoDB
    
  } catch (error) {
    console.log(">>> MongoDB conn FAILED!!! : ", error);
    process.exit(1) // exit strategy provided by node's process
  }
}

export default connectDB