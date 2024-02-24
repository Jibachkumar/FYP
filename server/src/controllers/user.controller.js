import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/apiResponse.js";

/*--------- this method goes through express so we have req, res --------*/
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // form, json data comes in body
  const { userName, email, password } = req.body;
  // console.log("email:",email,"userName:",userName,"password:", typeof password);

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
      "User with email or username already exists please fullfill unique username and email"
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

/*---------------- LoginUser -------------------*/

const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // add refreshToken and saving in DB
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch {
    throw new ApiError(
      500,
      "Something went wrong while generating refresh and access token"
    );
  }
};

const loginUser = asyncHandler(async (req, res) => {
  // get user login data from frontend: req.body
  const { email, password } = req.body;
  // console.log(typeof password);

  // email or username based access to the user
  //Check
  if (!email) {
    throw new ApiError(400, "email or password is required");
  }
  // find the user
  const user = await User.findOne({ email });

  if (!user) throw new ApiError(404, "user does not exit");

  // Check the password
  const isPasswordValid = await user.isPasswordCorrect(password);
  // console.log(typeof isPasswordValid);

  if (!isPasswordValid) throw new ApiError(401, "Incorrect Password");

  //generate access the refresh token
  const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
    user._id
  );

  //NOTE here: user is undefined so update DB or make query DB
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // send access and refresh token with cookie
  const options = {
    httpOnly: true,
    secure: true,
  };
  // response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

/*--------------------LogoutUser --------------------------*/

const logoutUser = asyncHandler(async (req, res) => {
  // user is authonizated or not based on that user get logged out
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "you are Successfully Logout"));
});

export { registerUser, loginUser, logoutUser };
