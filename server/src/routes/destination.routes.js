import { Router } from "express";
import { getDestination } from "../controllers/destination.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const destinationRouter = Router();

destinationRouter
  .route("/destination")
  .post(upload.fields([{ name: "images", maxCount: 10 }]), getDestination);

export { destinationRouter };
