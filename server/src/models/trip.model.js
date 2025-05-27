import mongoose, { Schema } from "mongoose";

const tripPlanScheme = new Schema(
  {
    name: {
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
    image: [{ type: String }],

    // // Store the calculated rating
    // averageRating: {
    //   type: Number,
    //   default: 0, // Default rating is 0
    // },
    // ratingCount: {
    //   type: Number,
    //   default: 0, // Default count is 0p
    // },
    // Embed user details
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Trip = mongoose.model("Trip", tripPlanScheme);
