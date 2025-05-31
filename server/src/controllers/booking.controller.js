import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.model.js";
import { Destination } from "../models/destination.model.js";
import { Booking } from "../models/Booking.model.js";
import { Trip } from "../models/trip.model.js";

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
    console.log("bookedTrip: ", bookedTrip);

    return res
      .status(200)
      .json(
        new ApiResponse(200, bookedTrip, "sucessfully fetched booked trip")
      );
  } catch (error) {
    throw new ApiError(error.message);
  }
});

const getBookingTrip = asyncHandler(async (_, res) => {
  try {
    const bookings = await Booking.find().populate("trip");
    const trips = await Trip.find();

    // Count bookings per trip name
    const bookingCountByName = {};
    let totalEarningsFromBookings = 0;
    bookings.forEach(({ trip }) => {
      if (trip?.name) {
        bookingCountByName[trip.name] =
          (bookingCountByName[trip.name] || 0) + 1;
        totalEarningsFromBookings += trip.price || 0;
      }
    });

    // Count trips per trip name
    const tripCountByName = {};
    let totalEarningsFromTrips = 0;
    trips.forEach((trip) => {
      if (trip.name) {
        tripCountByName[trip.name] = (tripCountByName[trip.name] || 0) + 1;
        totalEarningsFromTrips += trip.price || 0;
      }
    });

    // Find highest booking trip name by count
    let highestBookingName = null;
    let maxBookingCount = 0;
    for (const [name, count] of Object.entries(bookingCountByName)) {
      if (count > maxBookingCount) {
        maxBookingCount = count;
        highestBookingName = name;
      }
    }

    // Find highest trip name by count
    let highestTripName = null;
    let maxTripCount = 0;
    for (const [name, count] of Object.entries(tripCountByName)) {
      if (count > maxTripCount) {
        maxTripCount = count;
        highestTripName = name;
      }
    }

    // Decide final highest name based on count
    let finalHighestName = null;
    if (maxBookingCount > maxTripCount) {
      finalHighestName = highestBookingName;
    } else if (maxTripCount > maxBookingCount) {
      finalHighestName = highestTripName;
    } else {
      finalHighestName = highestBookingName || highestTripName;
    }

    // Find latest created name from bookings and trips
    let latestCreatedDate = null;
    let latestCreatedName = null;

    bookings.forEach(({ trip, createdAt }) => {
      if (trip?.name && createdAt) {
        if (!latestCreatedDate || createdAt > latestCreatedDate) {
          latestCreatedDate = createdAt;
          latestCreatedName = trip.name;
        }
      }
    });

    trips.forEach(({ name, createdAt }) => {
      if (name && createdAt) {
        if (!latestCreatedDate || createdAt > latestCreatedDate) {
          latestCreatedDate = createdAt;
          latestCreatedName = name;
        }
      }
    });

    const totalEarnings = totalEarningsFromBookings + totalEarningsFromTrips;

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          total: bookings.length + trips.length,
          highestBookingName,
          highestTripName,
          finalHighestName,
          latestCreatedName,
          totalEarningsFromBookings,
          totalEarningsFromTrips,
          totalEarnings,
          bookings,
          trips,
        },
        "Trips and bookings fetched successfully"
      )
    );
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

const getUserBookedDetails = asyncHandler(async (req, res) => {
  try {
    const bookings = await Booking.find().populate("trip").populate("user"); // populate user in bookings

    const trips = await Trip.find().populate("user_id"); // populate user in trips

    if (!bookings || !trips) {
      throw new ApiError(500, "Internal Server Error");
    }

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          bookings, // each booking includes trip + user
          trips, // each trip includes user info via user_id
        },
        "Trip booked user details fetched successfully"
      )
    );
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

export {
  bookingTrip,
  getUserBookingTrip,
  getBookingTrip,
  getUserBookedDetails,
};
