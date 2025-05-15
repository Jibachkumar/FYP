import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Destination",
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);
