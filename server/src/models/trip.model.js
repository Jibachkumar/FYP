import mongoose, { Schema } from "mongoose";

const tripPlanScheme = new Schema(
  {
    destination: {
      type: String,
      lowercase: true,
      trim: true, // no spacing
      unique: false, // Allow duplicate destinations
    },
    startDate: {
      type: Date,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    people: {
      type: Number,
      required: true,
    },
    activities: {
      type: String,
      lowercase: true,
    },

    price: {
      type: Number,
    },
    rating: {
      type: Number,
    },
    // Embed user trip details
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Trip = mongoose.model("Trip", tripPlanScheme);
