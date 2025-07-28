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
  startDate: {
    type: Date,
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
  type: {
    type: String,
  },
  // hotels: [
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     hotelImages: [
  //       {
  //         url: {
  //           type: String,
  //           _id: false,
  //         },
  //       },
  //     ],
  //     rooms: [
  //       {
  //         type: {
  //           type: String, // e.g., "single room", "double room"
  //           required: true,
  //         },
  //         price: {
  //           type: Number,
  //           required: true,
  //         },
  //       },
  //     ],
  //   },
  // ],
  // ✅ NEW FIELD: Itinerary (array of daily plans)
  itinerary: [
    {
      day: {
        type: Number,
        // required: true,
      },
      place: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

export const Destination = mongoose.model("Destination", destinationSchema);
