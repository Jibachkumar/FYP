import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Destination } from "../models/destination.model.js";

const userPayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  try {
    const { trip } = req.body;
    console.log("tripData from Payment:", trip);

    if (!trip) throw new ApiError(400, "trip data not available");

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: trip.name,
              description: `Charge for trip: ${trip.name}`,
            },
            unit_amount: Math.round(trip.price * 100), // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/success`,
      cancel_url: `${req.headers.origin}/cancel`,
    });

    if (!session)
      throw new ApiError(500, "Something went wrong while crating sessions");

    return res
      .status(200)
      .json(
        new ApiResponse(200, { sessionId: session.id }, "payment successful")
      );
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { userPayment };
