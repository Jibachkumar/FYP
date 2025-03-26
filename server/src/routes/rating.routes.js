import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { ratingTrip } from "../controllers/rating.user.controller.js";

const tripRating = Router();

tripRating.route("/rating").post(verifyJWT, ratingTrip);

export { tripRating };
