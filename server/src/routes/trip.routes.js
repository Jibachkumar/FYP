import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { createUserTrip } from "../controllers/userTrip.controller.js";

const tripRouter = Router();

tripRouter.route("/trip").post(verifyJWT, createUserTrip);

export { tripRouter };
