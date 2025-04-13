import React, { useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useForm, Controller } from "react-hook-form";
//import { useSelector } from "react-redux";

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
  //const [error, setError] = useState("");
  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);
  const { register, handleSubmit, control } = useForm();

  //   const trip = useSelector((state) => state.trip?.tripData?.tripData);

  //   if (!trip) setError("trip does not have data");
  //   const { data } = trip;
  const makeReview = async (data) => {
    // try{
    //     const response = await fetch("/api/v1/users/review", {
    //         method: "POST",
    //         headers: {
    //             "content-Type": "application/json"
    //         },
    //         body: JSON.stringify({
    //             ...data
    //         })
    //     })
    //     const data = await response.json()
    //     console.log(data)
    // }catch(error){
    //     console.log(error)
    // }
  };

  return (
    <div className="w-ful min-h-screen">
      <div className="relative mt-[2.9rem] w-full">
        <div className="relative lg:flex lg:justify-between ">
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
                        value={value}
                        precision={0.5}
                        getLabelText={getLabelText}
                        onChange={(event, newValue) => {
                          setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                          setHover(newHover);
                        }}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      {value === null && (
                        <Box sx={{ ml: 2 }}>
                          {labels[hover !== -1 ? hover : value]}
                        </Box>
                      )}
                    </Box>
                  )}
                />

                <h2 className=" text-xl font-serif mt-5">Write your review</h2>
                <textarea
                  {...register("description", { required: true })}
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
                    i certify that this review is based on my own experience and
                    is my genuine opinion <br /> of this establishment and that
                    i have no personal or business relationship with this <br />
                    establishment, and have not been offered any incentive or
                    payment originating <br /> from the establishment to write
                    this review. i understand that ExploreNepal has a <br />
                    zero-tolerance policy on fake reviews{" "}
                  </p>
                </div>
                <button className="lg:w-[33rem] mt-6 bg-cyan-950 text-white font-sans font-semibold text-xl border rounded-xl outline-none shadow-md px-3 py-2 hover:outline-none hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Review;
