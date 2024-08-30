import dotenv from "dotenv" 
import express from "express"
import cors from "cors"
import connectDB from "./db.js";
import userRoute from "./route.js"

const app = express()

dotenv.config({path: '../.env'})

app.use(cors({ origin: process.env.CORS_ORIGIN, Credential: true }))
app.use(express.json({limit: "16kb"})) // limiting json input to only 16kb
app.use(express.urlencoded({extended: true, limit: "16kb"})) // to receive url and encode them
app.use(express.static("public")) // declaring a public asset directory 

// routes declaration
app.use("/api/v1/", userRoute)

connectDB() // returns a promise as we have written a async function
  .then(() => {
    app.listen(process.env.PORT || 3002, () => {
      console.log(`>>> Server is running at: ${process.env.PORT}`);
    })
  })
  .then(() => {
    app.on("error", (error) => {
      console.log("Express error: ", error);
      throw error
    })
  })
  .catch((err) => {
    console.log(">>> MongoDB error connection FAILED !! ", err);
  })