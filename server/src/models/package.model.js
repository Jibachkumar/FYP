import mongoose, { Schema } from "mongoose";

const tourPackegeScheme = new Schema({
  package: [
    {
      name: {
        Type: String,
        required: true,
      },
      duration: {
        Type: Number,
        required: true,
      },
      price: {
        Type: Number,
      },
      route: {
        Type: String,
      },
    },
  ],
  user: {
    Type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

export const Package = mongoose.model("Package", tourPackegeScheme);
