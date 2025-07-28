import mongoose, { Schema } from "mongoose";

const ratingScheme = new Schema({
  rating: {
    type: Number,
    required: false,
    min: 1,
    max: 5,
  },
  comments: {
    type: String,
    required: false,
    lowercase: true,
  },
  trip_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Destination",
    index: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Rating = mongoose.model("Rating", ratingScheme);
