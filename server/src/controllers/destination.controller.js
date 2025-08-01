import { asyncHandler } from "../utils/asyncHandler.js";
import { Destination } from "../models/destination.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const getDestination = asyncHandler(async function (req, res) {
  try {
    const {
      name,
      price,
      description,
      duration,
      age_range,
      operated_in,
      type,
      startDate,

      // hotels,
    } = req.body;
    let itinerary = req.body.itinerary;

    // Parse itinerary if sent as a string
    if (typeof itinerary === "string") {
      const cleanedItinerary = itinerary.replace(/[\t\n\r]/g, " ");
      itinerary = JSON.parse(cleanedItinerary);
    } else if (Array.isArray(itinerary)) {
      // already parsed
    } else {
      throw new ApiError(400, "Invalid itinerary format. JSON parse failed.");
    }

    console.log("Parsed itinerary type:", typeof itinerary); // should be 'object'
    console.log("Is itinerary an array:", Array.isArray(itinerary)); // should be true

    // empty validation check
    if (
      !name ||
      !price ||
      !description ||
      !duration ||
      !age_range ||
      !operated_in ||
      !type ||
      !startDate ||
      !itinerary
      // !hotels
    )
      throw new ApiError(400, "all fields are required!");

    // check for image
    const imageLocalPath = [];

    const mainImages = req.files.filter((file) => file.fieldname === "images");
    if (mainImages.length === 0) {
      throw new ApiError(400, "Image file is missing");
    }

    for (const file of mainImages) {
      const photo = await uploadOnCloudinary(file.path);

      // console.log(req.files);
      // console.log("photo: ", photo);
      if (!photo) {
        throw new ApiError(400, "Error uploading image to Cloudinary");
      }
      // ✅ Delete temp file after successful upload
      if (fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
      imageLocalPath.push({ url: photo.url });
    }

    // Parse hotels if sent as JSON string (e.g. from Postman or frontend)
    // const parsedHotels = JSON.parse(hotels);

    // // Track uploaded image status per hotel
    // const hotelImageTracker = {};

    // for (const file of req.files) {
    //   console.log(file);
    //   const match = file.fieldname.match(/^hotelImages\[(.+?)\]$/);
    //   if (match) {
    //     const hotelName = match[1].trim().toLowerCase();
    //     const matchedHotel = parsedHotels.find(
    //       (h) => h.name.toLowerCase() === hotelName.toLowerCase()
    //     );
    //     if (matchedHotel) {
    //       if (!matchedHotel.hotelImages) matchedHotel.hotelImages = [];
    //       const uploaded = await uploadOnCloudinary(file.path);

    //       // ✅ Delete temp file after successful upload
    //       if (fs.existsSync(file.path)) {
    //         fs.unlinkSync(file.path);
    //       }

    //       if (uploaded?.url) {
    //         matchedHotel.hotelImages.push({ url: uploaded.url });
    //         // Track that this hotel got at least one image
    //         hotelImageTracker[hotelName] = true;
    //       }
    //     }
    //   }
    // }

    // // ✅ After upload loop, validate each hotel has at least one image
    // for (const hotel of parsedHotels) {
    //   const hotelKey = hotel.name.trim().toLowerCase();
    //   if (!hotelImageTracker[hotelKey]) {
    //     throw new ApiError(400, `Image(s) missing for hotel: ${hotel.name}`);
    //   }
    // }

    // check destination already exit
    const existedDestination = await Destination.findOne({ name });

    // modify the Destination package
    if (existedDestination) {
      //  add new images
      existedDestination.images.push(...imageLocalPath);

      // update other fields
      if (price && price !== existedDestination.price) {
        existedDestination.price = price;
      }
      existedDestination.duration = duration;
      existedDestination.age_range = age_range;
      existedDestination.operated_in = operated_in;
      existedDestination.type = type;
      existedDestination.description = description;
      existedDestination.startDate = startDate;
      existedDestination.itinerary = itinerary;

      await existedDestination.save();

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            existedDestination,
            "Destination updated successfully"
          )
        );
    }

    // create destination
    const destination = await Destination.create({
      name,
      price,
      images: imageLocalPath,
      description,
      duration,
      age_range,
      operated_in,
      type,
      startDate,
      itinerary,
      // hotels: parsedHotels,
    });

    if (!destination)
      throw new ApiError(
        500,
        "something went wrong while creating destination"
      );

    const createdDestination = await Destination.findById(destination._id);

    if (!createdDestination)
      throw new ApiError(
        500,
        "Something Went Wrong while creating the destination"
      );

    // return response
    return res
      .status(200)
      .json(
        new ApiResponse(
          201,
          createdDestination,
          "Destination uploaded Successfully"
        )
      );
  } catch (error) {
    console.log(error.message);
    throw new ApiError(500, error.message);
  }
});

const getTrip = asyncHandler(async (_, res) => {
  try {
    const data = await Destination.find();
    //console.log(data);
    if (!data) throw new ApiError(500, "Internal Server Error");
    return res
      .status(201)
      .json(new ApiResponse(201, data, "Destination fetched sucessfully"));
  } catch (err) {
    throw new ApiError(500, err.message);
  }
});

const getTripById = asyncHandler(async (req, res) => {
  const { tripId } = req.params;
  try {
    const trip = await Destination.findById(tripId);
    if (!trip) throw new ApiError(404, " Trip not Found ");

    return res
      .status(201)
      .json(new ApiResponse(201, trip, "Destination fetched sucessfully"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteTripbyId = asyncHandler(async (req, res) => {
  try {
    // get trip ID
    const { ID } = req.params;

    // matched trip Id to the DB
    const matchedId = await Destination.findById(ID);

    if (!matchedId) throw new ApiError(404, "Destination ID not matched");

    const deleteTrip = await Destination.findByIdAndDelete(ID);

    return res
      .status(201)
      .json(
        new ApiResponse(200, deleteTrip, "Destination deleted Successfully")
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(error.statusCode, error.message);
  }
});

export { getDestination, getTrip, getTripById, deleteTripbyId };
