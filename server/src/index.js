// require("dotenv").config();
// its did not work if we want to execute this we have to add experimental feature
import dotenv from "dotenv"; // maintaining consistancy

import { connectDB } from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();
