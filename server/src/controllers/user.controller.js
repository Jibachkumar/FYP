import { asyncHandler } from "../utils/asyncHandler.js";

// this method goes through express so we have req, res
export const registerUser = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});
