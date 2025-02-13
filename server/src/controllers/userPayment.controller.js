import Stripe from "stripe";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/apiError";
import { ApiResponse } from "../utils/apiResponse";
const userPayment = asyncHandler(async (req, res) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const { trip, token } = req.body;

    if (!trip || !token) throw new ApiError(400, "Invalid input data");

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    if (!customer) throw new ApiError(500, "failed to create customer");

    const charge = await stripe.charges.create({
      amount: trip.price * 100,
      currency: "usd",
      customer: customer.id,
      // optional
      receipt_email: token.email,
      description: `Charge for trip: ${trip.name}`,
      shipping: {
        name: token.card.name,
        address: {
          country: token.card.country,
          city: token.card.city,
        },
      },
    });
    if (!charge) throw new ApiError(500, "payment failed");

    return res
      .status(200)
      .json(new ApiResponse(200, charge, "payment successful"));
  } catch (error) {
    if (error.type === "StripeCardError")
      throw new ApiError(400, error.message);
    else
      throw new ApiError(500, "an error occured while processing the payment");
  }
});

export { userPayment };
