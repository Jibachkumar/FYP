import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { ratingTrip } from "../controllers/rating.controller.js";

const ratingRoute = Router();

ratingRoute.route("/rating").post(verifyJWT, ratingTrip);

export { ratingRoute };
