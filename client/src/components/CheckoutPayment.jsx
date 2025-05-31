import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function CheckoutPayment({ trip }) {
  const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const stripePromise = loadStripe(
    import.meta.env.VITE_REACT_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    console.log("trip Data:", trip);
    try {
      const stripe = await stripePromise;
      const response = await fetch("/api/v1/users/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          trip,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`Error ${response.status}!`);
      }

      const session = await response.json();
      console.log("session data", session);
      // Ensure the session ID is present
      if (!session.data.sessionId) {
        throw new Error("Session ID is missing in the response");
      }
      const result = await stripe.redirectToCheckout({
        sessionId: session.data.sessionId,
      });

      if (result.error) throw new Error(result.error.message);

      setSuccess(session.message);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    }
  };

  return (
    <>
      {trip && (
        <button
          className="focus:outline-none"
          onClick={handleCheckout}
          type="submit"
        >
          Book a Trip
        </button>
      )}

      {success && <p className=" text-red-700">{success}</p>}
      {error && <p className=" text-red-700">{error}</p>}
    </>
  );
}

export default CheckoutPayment;
