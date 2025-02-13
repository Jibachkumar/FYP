import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";

import { userPayment } from "../controllers/userPayment.controller.js";

const payment = Router();
payment.route("/payment").post(verifyJWT, userPayment);

export { payment };
