import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
// console.log(app);
dotenv.config({ path: "backend/config/config.env" });
// import Razorpay from "razorpay";
import { v2 as cloudinary } from 'cloudinary';
const port = process.env.PORT || 3000;
connectMongoDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, //Cloudinary username that identifies your cloud account
  api_key: process.env.CLOUDINARY_API_KEY, //identifies your application.
  api_secret: process.env.CLOUDINARY_API_SECRET //A private key that allows your application to authenticate and authorize its requests to the Cloudinary service
})
//This tells the Cloudinary SDK --> "Before I use any Cloudinary functions, here are my account credentials."

// export const instance = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET
// });

//handle uncaught exepction errors which are synchronous
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
// console.log(hello)
//handle unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err}`);
  console.log(`Shutting down the server due to unhandled promise rejection`);
  //Rejects the promise
  server.close(() => {
    process.exit(1);
  })
});