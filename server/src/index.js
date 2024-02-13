// require("dotenv").config(); // whenever the page load(index.js) also load .env
// its did not work if we want to execute this we have to add experimental feature
import dotenv from "dotenv"; // maintaining consistancy

import { connectDB } from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

// in bd file async return promise so handling promise
connectDB()
  .then(() => {
    // app.on((err) => {
    //   console.log(`Error:${err}`);
    //   throw err;
    // });
    app.listen(process.env.PORT || 7000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(`mongoDB connection failed !!!, ${err}`);
  });
