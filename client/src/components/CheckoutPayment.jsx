import React, { useState } from "react";
//import { useSelector } from "react-redux";
//import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

function CheckoutPayment({ trip }) {
  //const trip = useSelector((state) => state.trip.tripData.tripData);

  //const navigate = useNavigate();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const stripePromise = loadStripe(
    import.meta.env.VITE_REACT_STRIPE_PUBLISHABLE_KEY
  );

  const handleCheckout = async () => {
    //console.log("button is clicked");
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

      if (!response.ok) {
        throw new Error(`Error ${response.status}!`);
      }
      console.log(response);

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
      setError(error.message);
    }
  };

  return (
    <>
      {trip && (
        <button
          className=" lg:w-96 bg-cyan-600 px-4 py-1 shadow-md rounded-md font-semibold"
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
