// const express =require('express');
// const app=express();
// module.exports= app;
//commonJS module system
import express from "express";
import product from "./routes/productRoutes.js";
import errorMiddleware from "./middleware/error.js";
import user from "./routes/userRoutes.js";
import order from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import dotenv from 'dotenv'
import path from "path";
import { fileURLToPath } from "url";
import payment from "./routes/paymentRoutes.js"; //creates/populates process.env

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload()); //remember we are using 'Content-Type': 'multipart/form-data' in frontend, express cannot read this type of data by default (base64 is encoded)
/*If you don't use:
app.use(express.json());

then in your route:

app.post("/api/v1/products", (req, res) => {
  console.log(req.body);
});

You'll get:

undefined

because Express doesn't automatically understand JSON.
express.json() parses that JSON string using JSON.parse()
 */
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

//server static files
app.use(express.static(path.join(__dirname, "./frontend/dist")))
app.get(/.*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
})
// instead of "*"


app.use(errorMiddleware)
if (process.env.NODE_ENV !== 'PRODUCTION') {
  dotenv.config({ path: 'backend/config/.env' });
}
export default app;
//esm module system
