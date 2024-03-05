import mongoose, { Schema } from "mongoose";

const ratingScheme = new Schema({
  rating: {
    type: Number,
    required: true,
  },
  description: {
    Type: String,
    lowercase: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Trip",
  },
});

export const Rating = mongoose.model("Rating", ratingScheme);
