import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { User } from "../models/user.model.js";
import { Trip } from "../models/trip.model.js";

/*---------------------createUserTrip -------------------------*/
const createUserTrip = asyncHandler(async (req, res) => {
  // get user data
  const { destination, startDate, endDate, duration, people, places } =
    req.body;
  console.log(
    `destination: ${destination}, startDate: ${startDate}, endDate: ${endDate}, duration: ${duration}, people: ${people}, places: ${places}`
  );

  // validation
  // if (![destination, startDate, endDate, duration, people, places].every(field => typeof field === "string" && field.trim())) {
  //   throw new ApiError(400, "All fields are required");
  // }
  if (
    [destination, startDate, endDate, duration, people, places].some(
      (field) => typeof field === "string" && field?.trim() === " "
    )
  ) {
    throw new ApiError(400, "all fields are required");
  }

  try {
    // Check user is authenticated
    // find auth user in DB
    const user = await User.findById(req.user._id).select(
      "-password -refreshToken"
    );
    console.log(user);

    if (!user) throw new ApiError(404, "you are not authenticated");

    // create user trip object(holds trip data)
    const userTrip = await Trip.create({
      user,
      destination,
      startDate,
      endDate,
      duration,
      people,
      places,
    });
    console.log(userTrip);

    // Check trip is created
    const createdTrip = await Trip.findById(userTrip._id);

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

export { createUserTrip };
