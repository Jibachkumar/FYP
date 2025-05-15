import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

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

function Review() {
  const [data, setData] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [hover, setHover] = useState(-1);
  const { register, handleSubmit, control } = useForm();

  // fetching Booked Trip
  useEffect(() => {
    const fetchTrip = async () => {
      try {
        const response = await fetch("/api/v1/users/trip/booked");

        if (!response.ok) throw new Error(`Failed to fetch trip details`);

        const tripData = await response.json();
        console.log(tripData);
        if (tripData) {
          setData(tripData.data[0].trip);
        }
      } catch (error) {
        new Error(error.message);
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
              <div className="relative lg:w-[30%] w-full top-24">
                <h2 className=" text-center text-3xl font-bold font-serif lg:pl-56">
                  {" "}
                  Tell us how was your visit ?
                </h2>
                <div className="relative w-[15rem] h-[22rem] lg:mt-8 lg:left-28 shadow-sm py-3 overflow-hidden border border-gray-300 mx-auto">
                  <img
                    className="w-[13rem] h-[15rem] mx-auto rounded-sm object-cover transition-transform duration-1000 ease-in-out hover:scale-125 cursor-pointer"
                    src="https://t4.ftcdn.net/jpg/01/06/24/19/360_F_106241927_AQ3BRjRscmA0GKoYX4VdxQfQLPREZYfa.jpg"
                    alt="tripImage"
                  />
                  <label
                    htmlFor="label"
                    className="w-full text-center font-serif font-medium text-lg mt-8"
                  >
                    Destination: <span className=" text-pink-800">Pokhara</span>
                  </label>
                </div>
              </div>

              <div className="md:relative lg:top-20 lg:h-[30rem] lg:border-l lg:border-b-gray-500"></div>

              {/* rigth content */}
              <div className="relative lg:-left-60 lg:top-24 lg:w-1/2 flex justify-center items-center ">
                <form onSubmit={handleSubmit(makeReview)}>
                  <div className=" relative -top:20 ">
                    <h2 className="text-xl font-serif font-semibold py-2">
                      {" "}
                      How would you rate your experience?{" "}
                    </h2>
                    <Controller
                      name="rating"
                      control={control}
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
                        id={1}
                        name=""
                        value=""
                        className=" mt-1"
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
                      className="lg:w-[33rem] mt-6 bg-cyan-950 text-white font-sans font-semibold text-xl border rounded-xl outline-none shadow-md px-3 py-2 hover:outline-none hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                      type="submit"
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
    </div>
  );
}

export default Review;
