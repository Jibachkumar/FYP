import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
// import aggregatePaginate from "mongoose-aggregate-paginate-v2";

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
// middleware setting, which type of data should be taken to store eg: (url, json, from, body etc )
// almost all method have options: obj
app.use(express.json({ limit: "16kb" })); // json data
app.use(express.urlencoded({ extended: true, limit: "16kb" })); // url data // extended{}: for nested obj
app.use(express.static("public")); // pdf or photo store public folder
app.use(cookieParser());
//app.use(aggregatePaginate); // for Db query

// import routes
import { userRouter } from "./routes/user.routes.js";
import { tripRouter } from "./routes/trip.routes.js";
import { paymentRoute } from "./routes/payment.routes.js";
import { destinationRouter } from "./routes/destination.routes.js";
import { ratingRoute } from "./routes/rating.routes.js";
import { bookingRouter } from "./routes/booking.routes.js";

// routes declaration
// eg: http://localhost:7000/api/v1/users/register

app.use("/api/v1/users", userRouter);
app.use("/api/v1/users", tripRouter);
app.use("/api/v1/users", paymentRoute);
app.use("/api/v1/users", destinationRouter);
app.use("/api/v1/users", ratingRoute);
app.use("/api/v1/users", bookingRouter);
export { app };
