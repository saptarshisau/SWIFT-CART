import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
// console.log(app);
dotenv.config({ path: "backend/config/config.env" });
import { v2 as cloudinary } from 'cloudinary';
const port = process.env.PORT || 3000;
connectMongoDatabase();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})
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