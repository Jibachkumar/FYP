import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  bookingTrip,
  getUserBookingTrip,
} from "../controllers/booking.controller.js";

const bookingRouter = Router();

bookingRouter.route("/trip/:tripId/book").post(verifyJWT, bookingTrip);
bookingRouter.route("/trip/booked").get(verifyJWT, getUserBookingTrip);

export { bookingRouter };
