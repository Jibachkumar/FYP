import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { Destination } from "../models/destination.model.js";
import { Booking } from "../models/Booking.model.js";
import { User } from "../models/user.model.js";
import { Rating } from "../models/rating.moodel.js";

// Handle rating requests
const ratingTrip = asyncHandler(async (req, res) => {
  try {
    // get rating details
    const { rating, comments } = req.body;

    if (!rating && typeof rating === "number" && rating >= 1 && rating <= 5)
      throw new ApiError(400, "Invalid Rating value ! ");

    // get user
    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(401, "Unauthorized User");

    // check if login user created this trip
    const bookingData = await Booking.findOne({ user: user._id });

    // if (bookingData)
    //   throw new ApiError(403, "you already rated you cannot rate twice");

    // // check user already rating
    // const existingRating = await Rating.findOne({
    //   user_id: user._id,
    //   trip_id: bookingData.trip,
    // });

    // if (!existingRating)
    //   throw ApiError(409, "already rated you cannot rate twice");

    // add rating with some comments
    const rate = await Rating.create({
      rating,
      comments,
      trip_id: bookingData.trip,
      user_id: user._id,
    });

    const createdRating = await Rating.findById(rate._id);
    console.log("createdTrip: ", createdRating);

    if (!createdRating)
      throw new ApiError(500, "Something went wrong while Rating");

    const tripRatingCalculated = await calculateRating(createdRating.trip_id);
    console.log("tripRatingCalculated: ", tripRatingCalculated);

    // update Destination model with new rating
    const trip = await Destination.findByIdAndUpdate(
      createdRating.trip_id,
      {
        $set: {
          averageRating: tripRatingCalculated.averageRating.toFixed(1),
          ratingCount: tripRatingCalculated.ratingCount,
        },
      },
      { new: true }
    );

    console.log("trip: ", trip);

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
const calculateRating = async (tripId) => {
  if (!tripId) throw new ApiError(404, " tripId does not find ! ");

  try {
    const totalRating = await Rating.aggregate([
      {
        $match: {
          trip_id: tripId,
        },
      },
      {
        $group: {
          _id: "$trip_id",
          averageRating: { $avg: "$rating" }, // Calculate average rating
          ratingCount: { $sum: 1 }, // Count total ratings
        },
      },
    ]);

    if (!totalRating.length) {
      throw new ApiError(404, " Rating does not exits !");
    }
    //console.log("totalRating: ", totalRating);

    return totalRating[0];
  } catch (err) {
    console.log(err.message);
    throw new ApiError(500, err.message);
  }
};

const getTripRating = asyncHandler(async (req, res) => {
  try {
    const rating = await Rating.find().populate("user_id").populate("trip_id");

    //console.log(rating);
    if (!rating) throw new ApiError(500, "Internal Server Error");
    return res
      .status(201)
      .json(new ApiResponse(201, rating, "rating fetched sucessfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

export { ratingTrip, getTripRating };
