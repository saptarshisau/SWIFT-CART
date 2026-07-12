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
dotenv.config({ path: 'backend/config/config.env' });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload);
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
app.use(errorMiddleware)
export default app;
//esm module system
