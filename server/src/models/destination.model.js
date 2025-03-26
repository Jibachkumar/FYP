import mongoose, { Schema } from "mongoose";

const destinationSchema = new Schema({
  name: {
    type: String,
    lowercase: true,
    unique: false,
  },
  price: {
    type: Number,
  },
  images: [
    {
      url: {
        type: String,
        _id: false,
      },
    },
  ],
});

//TODO:
// get destinationDetails
// when the user search for destination based on that attached specific destination details
// display result

export const Destination = mongoose.model("Destination", destinationSchema);
