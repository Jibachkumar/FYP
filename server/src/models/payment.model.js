import mongoose, { Schema } from "mongoose";

const paymentScheme = new Schema({
  price: {
    Type: Number,
  },
  user: {
    Type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Package = mongoose.model("Package", paymentScheme);
