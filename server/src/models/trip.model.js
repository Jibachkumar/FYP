import mongoose, { Schema } from "mongoose";

const tripPlanScheme = new Schema(
  {
    destination: {
      type: String,
      lowercase: true,
      trim: true,
      unique: false,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    people: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
    },
    image: [],
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    // Embed user details
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Trip = mongoose.model("Trip", tripPlanScheme);
