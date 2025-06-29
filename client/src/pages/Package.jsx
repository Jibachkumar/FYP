import React, { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";
import { useTripData } from "../components/hooks/useTripData";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import L from "leaflet";

function Package() {
  const { tripData, loader } = useTripData();
  console.log(tripData);

  const navigate = useNavigate();
  const coords = [27.7172, 85.324]; // kathmandu location
  const [viewMap, setViewMap] = useState(null);

  function TripMap({ lat, lng, mapId, w = "170px", h = "130px" }) {
    useEffect(() => {
      const map = L.map(mapId).setView([lat, lng], 13);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
        map
      );

      return () => {
        map.remove();
      };
    }, [lat, lng]);

    return (
      <div
        id={mapId}
        style={{
          height: `${h}`,
          width: `${w}`,
          zIndex: 1,
          position: "relative",
        }}
      ></div>
    );
  }

  // const text = `"The tour included the captivating city renowned for its stunning, where I \n natural beauty, particularly its majestic mountain views and the tranquil \n Phewa Lake.."`;
  return (
    <div className="w-full mt-14">
      <div className=" border-b-2 p-3 w-[57rem] mx-auto mb-4 text-center">
        <h2 className="font-serif font-bold text-xl">Tours & Trips Package</h2>
      </div>

      {tripData.length > 0 && (
        <div className="flex flex-col w-full px-4">
          {tripData.map((tripData, i) => (
            <div
              key={tripData._id}
              className="flex self-stretch mb-6 px-4 shadow-sm rounded-xl py-3 overflow-hidden border-2 border-gray-200 mx-auto"
            >
              {/* left content */}
              <div>
                <div className="rounded-md overflow-hidden">
                  <img
                    className="w-[170px] h-[11rem] shadow-sm object-cover transition-transform duration-500 ease-in-out hover:scale-95 cursor-pointer"
                    src={tripData.images[0].url}
                    alt={tripData.name}
                  />
                </div>

                {/* Pass unique id for each map container */}
                <div
                  className="mt-2 shadow-sm rounded-md"
                  onClick={() => setViewMap(tripData._id)}
                >
                  <TripMap
                    lat={27.7} // replace with real coords if available
                    lng={85.3}
                    mapId={`map-container-${tripData._id}`}
                  />
                </div>
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
                      <p className="relative w-[30rem] -top-1 font-serif text-sm text-black/60 whitespace-pre-line">
                        {tripData.description}

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
              {viewMap === tripData._id && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
                  <div className="flex w-full max-w-6xl mx-auto items-stretch font-serif">
                    {/* Left Side: Map container */}
                    <div className="h-[600px] w-2/3">
                      <TripMap
                        lat={27.7}
                        lng={85.3}
                        mapId={`map-container-${i}`}
                        w="100%"
                        h="600px"
                      />
                    </div>

                    {/* Right Side: Info Panel */}
                    <div className="h-[600px] w-1/3 p-6 flex flex-col justify-between bg-white">
                      <div>
                        {/* Header info */}
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="font-semibold text-gray-900 text-base leading-tight max-w-[70%]">
                            Queen Cleopatra - 7 days
                          </h3>
                          <button
                            aria-label="Close"
                            className="text-gray-400 hover:text-gray-700 focus:outline-none"
                            type="button"
                            onClick={() => setViewMap(null)}
                          >
                            <svg
                              className="h-5 w-5"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 18L18 6M6 6l12 12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        {/* Price Info */}
                        <div className="mb-4">
                          <p className="text-xl font-extrabold text-teal-700 leading-none">
                            $540
                          </p>
                        </div>

                        {/* Buttons */}
                        <div className="mt-6 pt-4 border-t border-b border-gray-200 text-xs text-gray-700 text-center">
                          <button
                            className="mb-4 bg-teal-700 hover:bg-teal-800 text-white text-sm font-semibold py-2 px-5 rounded flex items-center justify-center gap-2 w-full max-w-[180px]"
                            type="button"
                          >
                            View tour
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M9 5l7 7-7 7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              ></path>
                            </svg>
                          </button>
                        </div>

                        {/* Destinations List */}
                        <div>
                          <p className="font-bold text-lg text-gray-900 mb-2">
                            Destinations
                          </p>
                          <ul className="text-gray-900 text-sm space-y-1">
                            <li className="flex items-center gap-2">
                              <span className="text-teal-700 text-lg leading-none">
                                <i className="fas fa-map-marker-alt"></i>
                              </span>
                              <span className="font-semibold">
                                Cairo (Egypt)
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
