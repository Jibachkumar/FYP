import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { userPayment } from "../controllers/userPayment.controller.js";

const paymentRoute = Router();
paymentRoute.route("/create-checkout-session").post(verifyJWT, userPayment);

export { paymentRoute };
