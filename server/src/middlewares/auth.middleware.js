import { ApiError } from "../utils/apiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
// const jwt = require("jsonwebtoken");
export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // user "accessToken" retrive from cookies or header(Authorization) through
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer", "");

    if (!token) throw new ApiError(401, "Unauthorized request");

    // if we have accessToken after that decoded Token
    // to match token with DB we have to decode, boz in BD token is stored in decoded(raw data) form, but we give data to user encoded data that why we have to match the token for that using "verify"
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );

    if (!user) throw new ApiError(401, "Invalid Access Token");

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
