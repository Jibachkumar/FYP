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
    price: {
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

// logic to calculate the price of the trip based on destination and other factors
// tripPlanScheme.methods.calculatePrice = function (
//   destination,
//   people,
//   duration
// ) {
//   let price = 0;

//   const destinationName = [
//     { name: kathmandu, price: 2000 },
//     { name: pohkara, price: 5000 },
//     mustang,
//     tilcho,
//     Pokhara,
//     Bhaktapur,
//     Patan,
//     Chitwan,
//     Lumbini,
//     Nagarkot,
//     Gosaikunda_Lake,
//     Kanchenjunga,
//     makalu,
//     Annapurna_Base_Camp,
//     Langtang_National_Park,
//     Rara_Lake,
//     Everest_Base_Camp,
//     Manang,
//     Tansen,
//     Janakpur,
//     Bardia_National_Park,
//     Ilam,
//   ];

//   console.log(destinationName.name);

//   if (destinationName.hasOwnProperty(destination) || people > 1) {
//     price = destinationName.price[destination] * people * duration;
//   }

//   return price;
// };

export const Trip = mongoose.model("Trip", tripPlanScheme);
