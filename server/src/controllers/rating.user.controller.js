import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Trip } from "../models/trip.model.js";
import { User } from "../models/user.model.js";
import { Rating } from "../models/rating.moodel.js";

// Handle rating requests
const ratingTrip = asyncHandler(async (req, res) => {
  try {
    // get rating details
    const { rating, comments } = req.body;

    if (!rating && typeof rating === "number" && rating >= 1 && rating <= 5)
      throw new ApiError(400, "Invalid Rating value ! ");

    // get user created trip
    const user = await User.findById(req.user?._id);
    console.log("user: ", user);
    // check if login user === trip.userId
    const tripData = await Trip.findOne({ user_id: user._id });
    console.log("tripData: ", tripData);
    if (!tripData)
      throw new ApiError(403, " sorry you cannot have access of rating");

    // add rating with some comments
    const rate = await Rating.create({
      rating,
      comments,
      trip: tripData._id,
      user: user._id,
    });

    // return response
    const createdRating = await Rating.findById(rate._id);

    if (!createdRating)
      throw new ApiError(500, "Something went wrong while Rating");

    // Return Respond
    return res
      .status(201)
      .json(new ApiResponse(200, createdRating, "sucessfully rated"));

    //TODO: attach this trip to the trip model where other user can view the rating on the destination
  } catch (err) {
    console.error("Error:", err);
    throw new ApiError(404, err.message);
  }
});

// Calculate average rating
function calculateAverageRating(ratings) {
  const sum = ratings.reduce((total, rating) => total + rating, 0);
  return sum / ratings.length;
}

export { ratingTrip };
