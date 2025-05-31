import React, { useEffect, useState, useRef } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller, set } from "react-hook-form";
import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import { useSelector } from "react-redux";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",

  3: "Ok+",
  3.5: "Average",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

const ComponentToPrint = React.forwardRef(({ trip, userData }, ref) => {
  if (!trip) return;
  if (!userData) return;
  const { createdAt, updatedAt, _id } = trip[0];
  const { userName, phoneNumber, email } = userData.data.user;
  console.log(trip);

  return (
    <div ref={ref}>
      <div className="flex justify-center bg-white p-4 font-serif">
        <div className="max-w-3xl w-full border border-gray-300">
          <h1 className="text-center font-semibold text-blue-700 text-lg pt-4 pb-6">
            Invoice
          </h1>

          <div className="grid grid-cols-2 border border-gray-300 text-xs text-gray-600">
            <div className="border-r border-gray-300 bg-gray-100 font-semibold text-center py-1">
              Invoice Details
            </div>
            <div className="bg-gray-100 font-semibold text-center py-1">
              Client Details
            </div>

            <div className="border-r border-gray-300 px-3 py-1">
              <span className="font-semibold">Invoice Date:</span>{" "}
              {new Date(createdAt).toLocaleDateString()}
            </div>
            <div className="px-3 py-1">
              <span className="font-semibold">Client Name:</span> {userName}
            </div>

            <div className="border-r border-gray-300 px-3 py-1">
              <span className="font-semibold">Invoice Number:</span> {_id}
            </div>
            <div className="px-3 py-1">
              <span className="font-semibold">Client Email:</span> {email}
            </div>

            <div className="border-r border-gray-300 px-3 py-1">
              <span className="font-semibold">Payment Time:</span>{" "}
              {new Date(updatedAt).toLocaleTimeString()}
            </div>
            <div className="px-3 py-1">
              <span className="font-semibold">Client Contact:</span>{" "}
              {phoneNumber}
            </div>
          </div>

          <table className="w-full border border-gray-300 mt-6 text-xs text-gray-700">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300 text-center text-gray-600">
                <th className="py-1 px-3 text-left">Description of Services</th>
                <th className="py-1 px-3 w-32">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-1 px-3">
                  {trip[0].trip.duration}-Day/night Guided {trip[0].trip.name}{" "}
                  Tour
                </td>
                <td className="py-1 px-3 text-right">${trip[0].trip.price}</td>
              </tr>
            </tbody>
          </table>

          <table className="w-full border border-gray-300 mt-6 text-xs text-gray-700">
            <tbody>
              <tr className="border-b border-gray-300">
                <td className="py-1 px-3 font-semibold text-right">
                  Tax (10%)
                </td>
                <td className="py-1 px-3 text-right"></td>
              </tr>
              <tr>
                <td className="py-1 px-3 font-semibold text-right">
                  Total Amount Due
                </td>
                <td className="py-1 px-3 text-right font-semibold">
                  ${trip[0].trip.price}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-6 text-xs text-gray-700 px-3 pb-6">
            <p className="font-semibold">Payment Information</p>
            <p className="mb-4">
              Trip name{" "}
              <span className="font-semibold">{trip[0].trip.name}, </span>
              Operated In{" "}
              <span className="font-semibold">
                {trip[0].trip.operated_in},{" "}
              </span>
              Trip Due Date <span className="font-semibold">October, </span> and
              Pickup point location{" "}
              <span className="font-semibold">Kathmandu, </span> Time{" "}
              <span className="font-semibold">10:00 AM</span>
            </p>

            <p className="font-semibold">Terms and Conditions</p>
            <ul className="list-disc list-inside mb-4">
              <li>
                Cancellations made less than 7 days before the scheduled start
                date are non-refundable.
              </li>
              <li>
                Prices include all listed services: Hotel, Food, Transportation,
                but do not cover personal expenses or add-ons.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
});
ComponentToPrint.displayName = "ComponentToPrint";

function Review() {
  const [data, setData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(-1);
  const [isChecked, setIsChecked] = useState(false);
  const [tripBookedView, setTripBookedView] = useState(false);
  const [invoice, setInvoice] = useState(null);

  const { register, handleSubmit, control } = useForm();
  const componentRef = useRef(null);
  const userData = useSelector((state) => state.auth.userData);

  // fetching Booked Trip
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch("/api/v1/users/trip/booked", {
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            // User not logged in
            setData(null);
            return;
          }
          throw new Error("Failed to fetch trip details");
        }

        const tripData = await response.json();
        console.log(tripData);
        if (tripData && tripData.data && tripData.data.length > 0) {
          setData(tripData.data[0].trip); //
          setInvoice(tripData.data);
        } else {
          setData(null);
        }
      } catch (error) {
        new Error(error.message);
        setData(null);
      }
    };
    fetchTrip();
  }, []);

  const makeReview = async (data) => {
    const { rating, comments } = data;
    try {
      const response = await fetch("/api/v1/users/rating", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify({
          rating,
          comments,
        }),
      });
      if (!response.ok) throw new Error(response.status);
      console.log(response);
      const data = await response.json();
      console.log(data);
      console.log(data.message);
      if (data) {
        setSubmitted(true);
        toast.success(data.message); // show toast now
        // sessionStorage.setItem("toastMessage", data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="w-full h-screen">
      {submitted ? (
        <div className="bg-[#E6F6F0] rounded-lg p-6 max-w-xs w-full mx-auto mt-16 text-center">
          <div className="flex justify-center mb-3">
            <div
              className="bg-[#0F9D58] rounded-full w-10 h-10 flex items-center justify-center"
              aria-hidden="true"
            >
              <i className="fas fa-check text-white text-lg"></i>
            </div>
          </div>
          <h1 className="font-poppins font-semibold font-serif text-black text-lg mb-1">
            Thanks for sharing!
          </h1>
          <p className="text-[#4B5563] text-sm  font-mono leading-relaxed">
            Your review helps other travelers and that's pretty awesome. Sit
            tight—we'll let you know when it's up,
          </p>
        </div>
      ) : (
        <div className="mt-[5rem] w-full">
          <h2 className=" text-2xl font-extrabold font-serif text-center">
            Write a review, make someone's trip
          </h2>
          <p className="text-xl font-bold font-mono text-center">
            Share your experience and help out a fellow traveler!
          </p>
          {data ? (
            <div className="lg:flex lg:justify-between ">
              {/* left content */}
              <div className="relative lg:w-[30%] w-full top-20">
                <h2 className=" text-center text-3xl font-bold font-serif lg:pl-56">
                  {" "}
                  Tell us how was your visit ?
                </h2>
                <label
                  htmlFor="label"
                  className="w-full text-center lg:pl-56 font-serif text-green-900 font-medium text-lg mt-2"
                >
                  Destination:{" "}
                  <span className=" text-pink-800">{data.name}</span>
                </label>
                <div className="relative w-full max-w-xs lg:mt-2 p-3 lg:left-28 shadow-sm  overflow-hidden border border-gray-300 mx-auto">
                  <div>
                    <img
                      className="w-full max-w-xs h-[13rem] mx-auto rounded-sm object-cover cursor-pointer"
                      src={data.images[0].url}
                      alt="tripImage"
                    />
                  </div>

                  <div className="max-w-xs mx-auto mt-3 bg-white rounded-sm shadow-lg flex items-center py-1 px-3">
                    <img
                      alt="Boat on water with trees and temple in background"
                      className="w-20 h-20 rounded-md object-cover"
                      height="80"
                      src={data.images[1].url}
                      width="80"
                    />
                    <div>
                      <div className="flex items-center ml-4 space-x-16">
                        <h3 className="font-semibold text-green-900 font-serif text-sm ">
                          {data.name.charAt(0).toUpperCase() +
                            data.name.slice(1)}
                          ...
                        </h3>
                        <i className="fas fa-ellipsis-h text-gray-600 text-xs"></i>
                      </div>
                      <div className=" ml-3 mt-1">
                        <Box>
                          <Rating
                            name="hover-feedback"
                            value={data.averageRating}
                            readOnly
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                        </Box>
                      </div>
                      <button
                        type="button"
                        onClick={() => setTripBookedView(true)}
                        className=" text-pink-800 text-lg ml-4 font-serif hover:font-semibold focus:outline-none transition-all duration-500 ease-in-out"
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:relative lg:top-20 lg:h-[30rem] lg:border-l lg:border-b-gray-500"></div>

              {/* rigth content */}
              <div className="relative lg:-left-60 lg:top-20 lg:w-1/2 flex justify-center items-center ">
                <form onSubmit={handleSubmit(makeReview)}>
                  <div className=" relative -top:20 ">
                    <h2 className="text-xl font-serif font-semibold py-2">
                      {" "}
                      How would you rate your experience?{" "}
                    </h2>
                    <Controller
                      name="rating"
                      control={control}
                      defaultValue={0}
                      render={({ field }) => (
                        <Box
                          sx={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                            text: "white",
                          }}
                        >
                          <Rating
                            name="hover-feedback"
                            value={field.value}
                            precision={0.5}
                            defaultValue={0}
                            getLabelText={getLabelText}
                            onChange={(_, newValue) => {
                              field.onChange(newValue);
                            }}
                            onChangeActive={(_, newHover) => {
                              setHover(newHover);
                            }}
                            emptyIcon={
                              <StarIcon
                                style={{ opacity: 0.55 }}
                                fontSize="inherit"
                              />
                            }
                          />
                          {field.value === null && (
                            <Box sx={{ ml: 2 }}>
                              {labels[hover !== -1 ? hover : field.value]}
                            </Box>
                          )}
                        </Box>
                      )}
                    />

                    <h2 className=" text-xl font-serif mt-5">
                      Write your review
                    </h2>
                    <textarea
                      {...register("comments", { required: true })}
                      className="w-full p-2 text-black hover:outline-none bg-white border border-gray-300 rounded-md resize-none break-words"
                      rows="4"
                      placeholder="Write your review..."
                    ></textarea>
                    <div className=" flex items-start mt-4">
                      <input
                        type="checkbox"
                        id="terms"
                        className=" mt-1"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                      />
                      <p className=" ml-2 font-serif text-sm text-black/60">
                        i certify that this review is based on my own experience
                        and is my genuine opinion <br /> of this establishment
                        and that i have no personal or business relationship
                        with this <br />
                        establishment, and have not been offered any incentive
                        or payment originating <br /> from the establishment to
                        write this review. i understand that ExploreNepal has a{" "}
                        <br />
                        zero-tolerance policy on fake reviews{" "}
                      </p>
                    </div>
                    <button
                      className="lg:w-[33rem] mt-6 bg-blue-950 text-white font-serif font-semibold text-xl border rounded-xl outline-none shadow-md px-3 py-2 hover:outline-none hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                      type="submit"
                      disabled={!isChecked} // <- disables until checkbox is checked
                      style={{
                        opacity: isChecked ? 1 : 0.5,
                        cursor: isChecked ? "pointer" : "not-allowed",
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </form>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto rounded-md bg-slate-50 mt-5">
              <h2 className="text-xl font-semibold font-serif px-3 py-2">
                {" "}
                Your review
              </h2>
              <div className="py-40 ">
                <p className="text-lg font-serif text-center ">
                  You have no reviews yet. After you book Trip, they will appear
                  here. and you can review
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {tripBookedView && (
        <div className="fixed top-[3.1rem] inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-7xl max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
            {/* <!-- Header --> */}
            <div className="relative flex items-center justify-between px-5 py-3 border-b border-gray-200">
              {/* Close Button - Left */}
              <button
                aria-label="Close"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setTripBookedView(false)}
              >
                <i className="fas fa-times text-lg"></i>
              </button>

              {/* Centered Title */}
              <h2 className="absolute left-1/2 transform -translate-x-1/2 text-lg font-semibold text-blue-950 font-serif">
                Trip Booked Information
              </h2>

              {/* Right-Aligned Button */}
              <div>
                <button
                  onClick={handlePrint}
                  className="bg-blue-500 font-mono text-white font-semibold py-1 px-3 rounded-lg hover:bg-blue-900 hover:text-white transition-all duration-150 hover:ring-1 hover:ring-blue-400"
                >
                  Print / Download
                </button>
              </div>
            </div>

            <div>
              <ComponentToPrint
                ref={componentRef}
                trip={invoice}
                userData={userData}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
