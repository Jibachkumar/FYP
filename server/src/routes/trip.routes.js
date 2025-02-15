import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import {
  createUserTrip,
  makePayment,
} from "../controllers/userTrip.controller.js";

const tripRouter = Router();

tripRouter.route("/trip").post(verifyJWT, createUserTrip);
tripRouter.route("/payment").post(verifyJWT, makePayment);

export { tripRouter };
