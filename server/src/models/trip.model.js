import mongoose, { Schema } from "mongoose";

const tripPlanScheme = new Schema({
  destination: {
    type: String,
    required: true,
    lowercase: true,
    trim: true, // no spacing
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
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
  places: {
    type: String,
    required: false,
    lowercase: true,
    trim: true, // no spacing
  },
  //   // Other fields specific to tripPlan

  // // Embed user trip details within tripPlan
  // userTrips: [
  //   {
  //     userId: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "User", // Reference to User model
  //       required: true,
  //     },
  //     // Additional fields related to user trip
  //   }
  // ]
});

export const Trip = mongoose.model("Trip", tripPlanScheme);
