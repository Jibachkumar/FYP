import { asyncHandler } from "../utils/asyncHandler.js";
import { Destination } from "../models/destination.model.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { ApiError } from "../utils/apiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getDestination = asyncHandler(async function (req, res) {
  try {
    const { name, price } = req.body;

    // empty validation check
    if (!name || !price) throw new ApiError(400, "all fields are required!");

    if (!req.files && !req.files.images && req.files.images.length === 0)
      throw new ApiError(400, "Image file is missing");
    console.log("whole image file: ", req.files?.images);

    // check for image
    const imageLocalPath = [];
    for (const files of req.files.images) {
      // upload on cloudinary
      const photo = await uploadOnCloudinary(files.path);
      if (!photo)
        throw new ApiError(
          400,
          "file is missing while uploading on cloudinary"
        );
      // console.log("photo: ", photo);
      // console.log(req.files);
      imageLocalPath.push({ url: photo.url });
      if (!imageLocalPath) {
        throw new ApiError(400, "Image file is missing");
      }
    }

    // check destination already exit
    const existedDestination = await Destination.findOne({ name });

    if (existedDestination) {
      existedDestination.images.push(...imageLocalPath);
      await existedDestination.save();

      console.log("added image: ", existedDestination);
      return;
    }

    // create destination
    const destination = await Destination.create({
      name,
      price,
      images: imageLocalPath,
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
    console.log(createdDestination);

    // return response
    return res
      .status(201)
      .json(
        new ApiResponse(
          201,
          createdDestination,
          "Destination uploaded Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { getDestination };
