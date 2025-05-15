import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: false,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Store the calculated rating
  averageRating: {
    type: Number,
    default: 0, // Default rating is 0
  },
  ratingCount: {
    type: Number,
    default: 0, // Default count is 0
  },
  description: {
    type: String,
  },
  images: [
    {
      url: {
        type: String,
        _id: false,
      },
    },
  ],
  duration: {
    type: Number,
  },
  age_range: {
    type: String,
  },
  operated_in: {
    type: String,
  },
});

//TODO:
// get destinationDetails
// when the user search for destination based on that attached specific destination details
// display result

export const Destination = mongoose.model("Destination", destinationSchema);
