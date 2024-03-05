import mongoose, { Schema } from "mongoose";

// const userReservedDetailsSchema = new Schema(
//   {
//     // Additional fields related to user trip
//     fullName: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       lowercase: true,
//       required: true,
//     },
//     // email: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   ref: "User",
//     //   lowercase: true,
//     //   trim: true,
//     //   required: true,
//     // },
//     phoneNumber: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     // address: {
//     //   type: String,
//     //   lowercase: true,
//     //   required: true,
//     // },
//   }
//   // { _id: false }
// ); // Prevent Mongoose from generating _id for each sub-document, mongoose adding default id to the sub-document

const tripPlanScheme = new Schema(
  {
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
    activities: {
      type: String,
      lowercase: true,
    },
    // Other fields specific to tripPlan

    // Embed user trip details within tripPlan

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// // Assuming you have your trip schema defined
// const Trip = require('./models/trip');

// // Express route to handle the calculation of the trip price
// app.post('/calculatePrice', async (req, res) => {
//   // Assuming req.body contains the trip details sent from the client
//   const { destination, startDate, endDate, accommodation, transportation } = req.body;

//   // Calculate price based on trip details
//   // This is just a placeholder logic, you should replace it with your actual price calculation logic
//   let price = 100; // Default price
//   if (destination === 'Paris') {
//     price += 200; // Additional cost for Paris
//   }
//   // Adjust price based on other trip details

//   try {
//     // Send the calculated price back to the client
//     res.status(200).json({ price });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });
export const Trip = mongoose.model("Trip", tripPlanScheme);
