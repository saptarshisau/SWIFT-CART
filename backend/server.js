import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
// console.log(app);
dotenv.config({ path: "backend/config/config.env" });
const port = process.env.PORT || 3000;
connectMongoDatabase();
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