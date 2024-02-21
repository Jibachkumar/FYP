import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

// this method goes through express so we have req, res
export const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // form, json data comes in body
  const { userName, email, password } = req.body;
  console.log("email:", email, "fullName:", userName, "password:", password);

  //  validation - field empty, username/email unique
  if (
    [userName, email, password].some(
      (field) => typeof field === "string" && field?.trim() === " "
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }

  // Check if user already exists: username, email through Check
  // with the help of user we can directly talk with DB, boz User are created by mongoose
  const existedUser = await User.findOne({
    $or: [{ userName }, { email }],
  });

  if (existedUser)
    throw new ApiError(
      409,
      "User with email or username already exists please fullfill unique name and username"
    );

  // create user object(holds user data) - create user and entry in db
  const user = await User.create({
    userName,
    email,
    password,
  });

  // Check user is creation
  // remove "password" and "refreshToken" from response: mongoose return everything in response
  const createdUser = await User.findById(user._id).select(
    " -password -refreahToken"
  );

  if (!createdUser)
    throw new ApiError(500, "Something Went Wrong while registering the user");

  // return response
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});
