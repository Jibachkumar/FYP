import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//////////////////////////setting of backend ///////////////////////////////
// config cors
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// express config
// middleware set which type of data should be taken to store eg: (url, json, from, body etc )
app.use(express.json({ limit: "16kb" })); // json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // url data // extended for nested obj
app.use(express.static("public")); // pdf or photo store public folder
app.use(cookieParser());

export { app };
