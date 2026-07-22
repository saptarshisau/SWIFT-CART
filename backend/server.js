import app from "./app.js";
import dotenv from "dotenv";
import { connectMongoDatabase } from "./config/db.js";
// console.log(app);
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/config/.env' });
}
import Razorpay from "razorpay";
import { v2 as cloudinary } from 'cloudinary';
const port = process.env.PORT || 3000;
connectMongoDatabase();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME, //Cloudinary username that identifies your cloud account
  api_key: process.env.CLOUDINARY_API_KEY, //identifies your application.
  api_secret: process.env.CLOUDINARY_API_SECRET //A private key that allows your application to authenticate and authorize its requests to the Cloudinary service
})
//This tells the Cloudinary SDK --> "Before I use any Cloudinary functions, here are my account credentials."

//handle uncaught exepction errors which are synchronous
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err}`);
  console.log(`Shutting down the server due to uncaught exception`);
  process.exit(1);
})

// console.log("KEY_ID:", process.env.RAZORPAY_API_KEY);
// console.log("KEY_SECRET:", process.env.RAZORPAY_API_SECRET);
//error--> undefined key_id -->  key name wrong 

export const instance = new Razorpay({
  //The SDK remembers these credentials inside instance.
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET
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


/*
HTTP Basic Authentication is already a standard protocol.
(remember cloudinary used HMAC+SHA signature)
Your Backend
────────────────────────────

key_id = rzp_test_abc123
secret = secretXYZ

        │
        ▼
Combine

rzp_test_abc123:secretXYZ

        │
        ▼
Base64 Encode

cnpwX3Rlc3RfYWJjMTIzOnNlY3JldFhZWg==

        │
        ▼
Authorization: Basic <encoded string>

────────────────────────────
        HTTPS
────────────────────────────

        │
        ▼

Razorpay Server

Decode Base64

↓

rzp_test_abc123:secretXYZ

↓

Find account by Key ID

↓

Compare Secret Key

↓

✓ Authenticated
*/