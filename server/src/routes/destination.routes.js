import { Router } from "express";
import {
  getDestination,
  getTrip,
  getTripById,
} from "../controllers/destination.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const destinationRouter = Router();

destinationRouter
  .route("/destination")
  .post(upload.fields([{ name: "images", maxCount: 10 }]), getDestination);

destinationRouter.route("/alltrip").get(getTrip);
destinationRouter.route(`/alltrip/:tripId`).get(getTripById);

export { destinationRouter };
