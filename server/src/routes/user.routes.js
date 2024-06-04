import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  updateAccountDetails,
  changeCurrentPassword,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRouter = Router();

userRouter.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

userRouter.route("/login").post(loginUser);

userRouter.route("/logout").post(verifyJWT, logoutUser);
userRouter.route("/editprofile").post(verifyJWT, updateAccountDetails);
userRouter.route("/changepassoword").post(verifyJWT, changeCurrentPassword);
userRouter.route("/updateprofile").post(verifyJWT, updateUserAvatar);
userRouter.route("/updatecoverimage").post(verifyJWT, updateUserCoverImage);

export { userRouter };
