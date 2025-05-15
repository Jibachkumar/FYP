import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Destination } from "../models/destination.model.js";
import { Booking } from "../models/Booking.model.js";

const bookingTrip = asyncHandler(async (req, res) => {
  //get trip id from frontend
  const { tripId } = req.params;
  try {
    // check user is authenticated or not
    const user = await User.findById(req.user?._id);
    if (!user) throw new ApiError(401, "Unauthorized User");

    // find the trip from tripID
    const trip = await Destination.findById(tripId);
    if (!trip) throw new ApiError(404, "sorry trip not found!");

    // create booking
    const booking = await Booking.create({
      user: user._id,
      trip: tripId,
    });
    const booked = await Booking.findById(booking._id);
    if (!booked)
      throw new ApiError(500, "Something went wrong while booking the trip");

    console.log("Booked: ", booked);
    // return booking
    return res
      .status(201)
      .json(new ApiResponse(200, booked, "Trip sucessfully booked "));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getUserBookingTrip = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(401, "Unauthorized User");

    const bookedTrip = await Booking.find({ user: user._id }).populate("trip");
    if (!bookedTrip) throw new Error(404, "trip not found!");
    console.log("bookedTrip: ", bookedTrip);

    return res
      .status(201)
      .json(
        new ApiResponse(200, bookedTrip, "sucessfully fetched booked trip")
      );
  } catch (error) {
    throw new ApiError(error.message);
  }
});

export { bookingTrip, getUserBookingTrip };
