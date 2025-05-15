import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useTripData } from "../components/hooks/useTripData";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

function Package() {
  const { tripData, loader } = useTripData();

  const navigate = useNavigate();

  const text = `"The tour included the captivating city renowned for its stunning, where I \n natural beauty, particularly its majestic mountain views and the tranquil \n Phewa Lake.."`;
  return (
    <div className="w-full mt-14">
      {tripData.length > 0 && (
        <div className="flex flex-col w-full px-4">
          {tripData.map((tripData) => (
            <div
              key={tripData._id}
              className="flex self-stretch mb-6 px-4 shadow-sm rounded-xl py-3 overflow-hidden border-2 border-gray-200 mx-auto"
            >
              {/* left content */}
              <div className=" lg:h-[12.7rem] h-[11.7rem] border p-1 border-gray-300 rounded-md">
                <img
                  className="lg:w-[10rem] lg:h-[12rem] w-[9rem] h-[11rem]  rounded-sm object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer"
                  src={tripData.images[0].url}
                  alt={tripData.name}
                />
              </div>

              {/* center Content */}
              <div className=" ml-4 cursor-pointer">
                <div className=" flex text-sm font-serif gap-3">
                  {["Explorer", "Family", "Friends"].map((item) => (
                    <p
                      key={item}
                      className="px-2 py-1 bg-slate-200 rounded-lg shadow-md"
                    >
                      {item}
                    </p>
                  ))}
                </div>
                <div className="flex ">
                  <div>
                    <h2 className="mt-4 text-xl font-sans lg:font-serif font-semibold whitespace-pre-line">
                      {tripData.name} trip {tripData.duration} Day "(Kathmandu -{" "}
                      <br />
                      {tripData.name}
                      )"...
                    </h2>
                    {/* TODO: rating */}
                    <div className=" flex gap-x-2">
                      <Box>
                        <Rating
                          name="hover-feedback"
                          value={tripData.averageRating}
                          readOnly
                          emptyIcon={
                            <StarIcon
                              style={{ opacity: 0.55 }}
                              fontSize="inherit"
                            />
                          }
                        />
                      </Box>
                      <span className="text-base font-medium font-serif text-black/45">
                        ({tripData.ratingCount} traveler reviews)
                      </span>
                    </div>

                    <div className=" flex">
                      <div className="relative h-20 border-l-2 border-gray-300 md:mr-2 border-b-gray-50"></div>
                      <p className="relative -top-1 font-serif text-sm text-black/60 whitespace-pre-line">
                        {text}
                        <span className="block mt-2">Traveled in December</span>
                      </p>
                      {/* <p className="block">Traveled in December </p> */}
                    </div>
                  </div>
                </div>
                {/* info Section */}
                <div className=" mt-2">
                  <h2 htmlFor={tripData.name}>
                    <span className=" text-base font-semibold font-serif">
                      Destination
                    </span>
                    <span className="font-serif ml-16">{tripData.name}</span>
                  </h2>
                  <h2 htmlFor="age">
                    <span className=" text-base font-semibold font-serif">
                      Age Range
                    </span>
                    <span className="font-serif ml-[4.7rem]">
                      From 15 to {tripData.age_range}
                    </span>
                  </h2>
                  <h2 htmlFor="operatedIn">
                    <span className=" text-base font-semibold font-serif">
                      Operated In
                    </span>
                    <span className="font-serif ml-16">
                      {tripData.operated_in}
                    </span>
                  </h2>
                  <h2 htmlFor="operator">
                    <span className=" text-base font-semibold font-serif">
                      Operator
                    </span>
                    <span className="font-serif ml-[5.3rem]">
                      Islington Travel
                    </span>
                  </h2>
                </div>
              </div>

              {/* right content */}
              <div className="pl-4">
                <div className="flex justify-end">
                  <p className="bg-yellow-600 py-1 px-4 mr-4 font-mono font-semibold text-white/90 rounded-2xl shadow-md text-center ">
                    Offer
                  </p>
                </div>
                <div className=" mt-4">
                  <div className="flex justify-evenly text-xs text-black/70 font-serif ">
                    <span>DURATION</span>
                    <span>FROM</span>
                  </div>

                  <div className="flex justify-evenly text-sm font-mono ">
                    <label htmlFor="price">{tripData.duration}</label>
                    <label htmlFor="duration">${tripData.price}</label>
                  </div>

                  <p className="mt-4 font-serif text-sm text-black/40">
                    book now + easy payment{" "}
                  </p>
                  <button
                    className="bg-cyan-700 mt-14 ml-2 px-4 py-1 rounded-2xl shadow-md text-lg font-mono text-white/90 font-semibold outline-none hover:outline-none hover:scale-105 transition-transform duration-300 ease-in-out cursor-pointer"
                    onClick={() => navigate(`/trip/${tripData._id}`)}
                  >
                    view tour
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {loader && (
        <div className="relative top-0 left-0 w-full h-screen flex items-center justify-center bg-opacity-50 z-50">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default Package;
