import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createUserTrip } from "../controllers/userTrip.controller.js";
import { userPayment } from "../controllers/userPayment.controller.js";

const tripRouter = Router();

tripRouter.route("/trip").post(verifyJWT, createUserTrip);
tripRouter.route("/payment").post(verifyJWT, userPayment);

export { tripRouter };
