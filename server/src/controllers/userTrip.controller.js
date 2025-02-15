import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Trip } from "../models/trip.model.js";

/*---------------------getUserDetails -------------------------*/
// pipline: stages of
const getUserDetails = asyncHandler(async (req, res) => {
  Trip.aggregate([
    {
      $match: {},
    },
  ]);
});

/*---------------------createUserTrip -------------------------*/
const createUserTrip = asyncHandler(async (req, res) => {
  // get user data
  const { destination, startDate, duration, people, activities } = req.body;

  if (
    [destination, startDate, duration, people].some(
      (field) => typeof field === "string" && field?.trim() === " "
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }
  const rate = 4;
  try {
    // Check user is authenticated
    // find auth user in DB
    const authUser = await User.findOne({ _id: req.user._id });
    console.log("AuthUser:", authUser);

    if (!authUser) throw new ApiError(404, "User not found");

    const tripPrice = await authUser.calculatePrice(
      destination,
      people,
      duration
    );

    // create user trip object(holds trip data)
    const userTrip = await Trip.create({
      destination,
      startDate,
      duration,
      people,
      activities,
      price: tripPrice,
      rating: rate,
      user_id: authUser,
    });
    console.log(userTrip);

    // Check trip is created
    const createdTrip = await Trip.findById(userTrip._id);
    console.log("createdTrip:", createdTrip);

    if (!createdTrip)
      throw new ApiError(500, "Something went wrong while creating trip");

    // retrun response
    return res
      .status(200)
      .json(new ApiResponse(200, createdTrip, "Successfully created trip"));
  } catch (error) {
    console.log(error);
    throw new ApiError(error.status || 500, error.message);
  }
});

const makePayment = asyncHandler(async (req, res) => {
  try {
  } catch (err) {
    throw new ApiError();
  }
});

export { createUserTrip, makePayment };
