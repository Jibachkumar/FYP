import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { trip as tripSlice } from "../store/tripSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { getTrip } from "../store/tripSlice.js";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import CheckoutPayment from "../components/CheckoutPayment.jsx";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

function Trip() {
  const tripData = useSelector((state) => state.trip.trips);
  console.log(tripData);

  const tripBookedData = useSelector((state) => state.trip?.tripData?.tripData);
  console.log(tripBookedData);

  const { register, handleSubmit, control, watch, setValue, reset } = useForm({
    defaultValues: {
      name: tripData?.name || "",
      startDate: "",
      duration: "",
      people: "",
      message: "",
    },
  });

  useEffect(() => {
    if (tripData && typeof tripData === "object" && tripData.name) {
      setValue("name", tripData.name);
    }
  }, [tripData?.name, setValue]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataSourceError, setDataSourceError] = useState("");
  const [activeTab, setActiveTab] = useState("information");
  const [searchInput, setSearchInput] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [tripView, setTripView] = useState(false);
  const [selectedExtra, setSelectedExtra] = useState("no-extras");
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? tripBookedData.data.image.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === tripBookedData.data.image.length - 1 ? 0 : prev + 1
    );
  };

  const setError = (value) => {
    if (value <= 0) {
      setDataSourceError("Value must be greater than or equal to 0");
      return false; // Prevent form submission
    }
    setDataSourceError(""); // Clear the error message if validation passes
    return true; // Allow form submission
  };

  const handleDestinationSearch = async (name) => {
    try {
      if (!name) return;
      const response = await fetch(
        "http://localhost:7000/api/v1/users/alltrip"
      );

      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      const data = await response.json();

      const matchDestination = data.data.find(
        (place) => place.name === name.toLowerCase()
      );
      if (matchDestination) {
        dispatch(getTrip(matchDestination));
        setValue("name", matchDestination.name);
      } else {
        dispatch(getTrip("Sorry did not match destination name"));
        setValue("name", "");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const createTrip = async (data) => {
    console.log(data);

    try {
      const response = await fetch("/api/v1/users/trip", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
        }),
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(`log in Error ${response.status}`);
      }

      const tripData = await response.json();
      console.log("tripData: ", tripData);

      console.log(tripData.message);
      // console.log(tripData.tripData.data);

      if (!tripData) throw new Error(tripData.message);
      dispatch(tripSlice({ tripData: tripData }));
      // navigate("/tripcontent");
      setTripView(true);
      setSearchInput("");

      reset();
    } catch (error) {
      console.log(error.message);
      new Error(error.message);
    }
  };

  return (
    <div className="w-full h-full mt-[3.2rem] bg-[#f9f7f0]">
      {tripData.images ? (
        <div className="w-full h-full">
          <img
            src={tripData.images[0].url}
            alt=""
            className="w-full h-[32rem] object-cover"
          />
        </div>
      ) : (
        <div className="w-full h-full">
          <img
            src="https://gisgeography.com/wp-content/uploads/2021/07/Nepal-Satellite-Map.jpg"
            alt=""
            className="w-full h-[32rem] object-cover"
          />
        </div>
      )}

      <div className=" relative -top-24 max-w-7xl bg-white mx-auto z-10">
        <div className="flex bg-gray-100 text-xs font-semibold uppercase text-gray-700">
          {["information", "gallery"].map((tab, index) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center space-x-2 outline-none  transition-all duration-100 focus:outline-none ${
                activeTab === tab
                  ? " bg-white px-5 py-[40px]"
                  : " hover:bg-white px-5 py-[40px]"
              }`}
            >
              <div
                className={`${
                  index === 1 ? "pl-4" : "pl-4"
                } flex items-center gap-2`}
              >
                <i
                  className={`text-[15px] ${
                    tab === "information" ? "fas fa-book-open" : "fas fa-camera"
                  }`}
                ></i>
                <span>{tab.toUpperCase()}</span>
              </div>
            </button>
          ))}

          <div className="w-full flex justify-end items-center mr-36">
            <div className=" relative flex items-center rounded-full border border-gray-700">
              <Input
                placeholder="Search destinations"
                className="w-full bg-transparent text-black px-5 placeholder-gray-400 border-none focus:ring-0 focus:outline-none"
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                onClick={() => handleDestinationSearch(searchInput)}
                className="px-3 py-2 rounded-r-full bg-slate-800 hover:bg-gray-900 text-white"
              >
                <IoMdSearch className="h-6 w-6 " />
              </button>
            </div>
          </div>
        </div>

        <div className="flex pb-5">
          {/* Tab Content */}
          <div className="p-4">
            {activeTab === "information" && (
              <div>
                {typeof tripData === "string" ? (
                  <div className="w-full mx-auto bg-slate-50 mt-4">
                    <p className="text-red-500 text-center font-medium px-60 py-52 font-serif">
                      {tripData}
                    </p>
                  </div>
                ) : (
                  <div>
                    <h2 className="text-2xl font-semibold flex flex-wrap font-serif items-center gap-2">
                      {tripData.name.charAt(0).toUpperCase() +
                        tripData.name.slice(1)}
                    </h2>

                    <div className="flex items-center space-x-1 mt-2 text-lg">
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
                          ({tripData.ratingCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="mt-4 text-gray-700 font-mono text-sm leading-relaxed max-w-3xl">
                      <p className="mt-1">{tripData.description}</p>

                      <p className="mt-1">
                        <span className="italic font-semibold text-green-700">
                          Price includes:
                        </span>
                      </p>
                      <ul className="list-disc list-inside mt-1 space-y-0.5 text-gray-700">
                        <li>Comfortable transport during the tour.</li>
                        <li>include food and hotel.</li>
                        <li>Entrance fee.</li>
                      </ul>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2 max-w-md">
                      <button
                        className="flex items-center bg-[#3fc1c9] text-white px-4 py-2 text-sm font-medium rounded-sm"
                        type="button"
                      >
                        <i className="far fa-calendar-alt mr-2"></i>1
                      </button>
                      <button
                        className="bg-[#3fc1c9] text-white px-6 py-2 text-sm font-light rounded-sm"
                        type="button"
                      >
                        Classic &amp; Cultural
                      </button>
                      <button
                        className="bg-[#3fc1c9] text-white px-6 py-2 text-sm font-light rounded-sm"
                        type="button"
                      >
                        Popular Tours
                      </button>
                    </div>

                    <div className="mt-8 max-w-md flex justify-between text-sm font-semibold text-gray-900">
                      <span className="font-mono">Departure Time</span>
                      <span className="text-green-700 font-mono">10:00 AM</span>
                    </div>
                    <div className="mt-8 max-w-md flex justify-between text-sm font-semibold text-gray-900">
                      <span className="font-mono">Departure Location</span>
                      <span className="text-green-700 font-mono">
                        Kathmandu
                      </span>
                    </div>
                    <div className="mt-8 max-w-md flex justify-between text-sm font-semibold text-gray-900">
                      <span className="font-mono">Operated In</span>
                      <span className="text-green-700 font-mono">
                        {tripData.operated_in}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            {activeTab === "gallery" && (
              <div>
                <h1 className="ml-3 font-serif text-xl pb-2">Gallery</h1>
                {tripData.images ? (
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-y-2 ">
                    {tripData.images.map((img, i) => (
                      <img
                        key={i}
                        src={img.url}
                        alt={img._id}
                        className="w-[380px] h-[280px] mx-auto rounded-sm object-cover"
                      />
                    ))}
                  </div>
                ) : (
                  <p>Image is not available</p>
                )}
              </div>
            )}
          </div>

          {activeTab === "information" && (
            <form onSubmit={handleSubmit(createTrip)}>
              <div className="bg-[#4dc1ca] px-5 py-4 mt-12 ml-16 flex flex-col gap-y-5">
                <div className="max-w-[210px] text-[#ECFAE5]">
                  <h2 className="text-center font-serif font-extrabold">
                    Book Trip
                  </h2>
                  <p className="font-mono text-xs font-medium">
                    Arrange your trip in advance customize this tour now!
                  </p>
                </div>
                <div className="relative gap-2">
                  <span className="absolute inset-y-0 left-4 flex items-center text-white text-sm">
                    <i className="fas fa-user"></i>
                  </span>
                  <Input
                    placeholder="Name"
                    readOnly
                    {...register("name", {
                      required: true,
                    })}
                    className={`w-full bg-[#66cbd2] text-white placeholder-white  py-2 rounded placeholder:text-left  pl-10`}
                  />
                </div>

                <div className="relative">
                  <Controller
                    name="startDate"
                    control={control}
                    defaultValue={null}
                    render={({ field: { onChange, value } }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          open={isDatePickerOpen}
                          onClose={() => setIsDatePickerOpen(false)}
                          onOpen={() => setIsDatePickerOpen(true)}
                          // value={value ?? null}
                          // value={value}
                          onChange={onChange}
                          format="YYYY-MM-DD"
                          slots={{
                            openPickerIcon: () => null, // ✅ Hide default icon
                          }}
                          slotProps={{
                            textField: {
                              variant: "standard",
                              fullWidth: true,
                              placeholder: "YYYY-MM-DD",
                              InputProps: {
                                disableUnderline: true,
                                className:
                                  "w-full bg-[#66cbd2] rounded pl-3 text-xs",
                                style: {
                                  fontSize: "13px",
                                  paddingTop: "0.2rem",
                                  paddingBottom: "0.2rem",
                                },
                                startAdornment: (
                                  <span
                                    className="cursor-pointer pr-2"
                                    onClick={() => setIsDatePickerOpen(true)}
                                  >
                                    <i
                                      className="fas fa-calendar-alt"
                                      style={{
                                        fontSize: "13px",
                                        color: "white",
                                      }}
                                    ></i>
                                  </span>
                                ),
                              },
                              inputProps: {
                                className:
                                  "text-white placeholder-white text-xs",

                                onClick: () => setIsDatePickerOpen(true), // ✅ Open picker when clicking input
                              },
                              sx: {
                                input: {
                                  color: "white", // force input text white
                                  "&::placeholder": {
                                    color: "white", // force placeholder white
                                    opacity: 1, // make sure it's not transparent
                                  },
                                },
                              },
                            },
                          }}
                        />
                      </LocalizationProvider>
                    )}
                  />
                </div>

                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-white text-sm">
                    <i className="fas fa-user"></i>
                  </span>
                  {/* w-full bg-[#66cbd2] text-[13px] text-white placeholder-white pl-10 py-2 rounded focus:outline-none */}
                  <select
                    className="w-full appearance-none bg-[#66cbd2] text-[13px] text-white pl-10 pr-8 py-2 rounded placeholder-white focus:outline-none focus:ring-2 focus:ring-[#66cbd2]"
                    defaultValue={0}
                    {...register("duration", {
                      required: true,
                      valueAsNumber: true, // ✅ converts the selected value to a number
                    })}
                  >
                    <option value="" disabled hidden>
                      Select duration
                    </option>
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={7}>7</option>
                    <option value={10}>10</option>
                  </select>
                </div>
                <div className="relative">
                  <span className="absolute inset-y-0 left-4 flex items-center text-white text-sm">
                    <i className="fa-solid fa-keyboard"></i>
                  </span>
                  <Input
                    placeholder="number of traveler"
                    {...register("people", {
                      required: true,
                      valueAsNumber: true,
                      validate: (value) => setError(value),
                    })}
                    className={`w-full bg-[#66cbd2] text-white placeholder-white  py-2 rounded focus:outline-none placeholder:text-left pl-10 `}
                  />
                </div>
                <div className="relative gap-2">
                  <span className="absolute inset-y-0 left-4 flex items-center text-white text-sm">
                    <i className="fas fa-user"></i>
                  </span>
                  <textarea
                    placeholder="Message"
                    // {...register("message", { required: true })}
                    className="w-full bg-[#66cbd2] text-white placeholder-white pl-10 py-2 rounded focus:outline-none placeholder:"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-transparent border border-cyan-900 text-white font-serif py-[6px] rounded-xl  focus:outline-none hover:outline-none"
                >
                  create a Trip
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
      {tripView && (
        <div className="fixed top-14 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-lg">
            <div className="overflow-y-auto">
              {/* <!-- Header --> */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-gray-200">
                <button
                  aria-label="Close"
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={() => setTripView(false)}
                >
                  <i className="fas fa-times text-lg"></i>
                </button>
                <h2 className="text-lg font-semibold text-blue-950 font-serif">
                  Trip information
                </h2>
                <div className="w-6"></div>
              </div>
              {/* <!-- Image --> */}
              <div className="flex relative justify-center p-5">
                <img
                  src={tripBookedData.data.image[currentIndex]}
                  alt={tripBookedData.data.name}
                  className="rounded-xl max-w-full max-h-[320px] object-cover"
                  height="320"
                  width="720"
                />
                {/* Previous Button */}
                <button
                  onClick={goToPrevious}
                  className="absolute top-1/2 left-20 transform -translate-y-1/2 px-2 bg-white/70 focus:outline-none rounded-full hover:bg-white"
                >
                  <i className="fas fa-chevron-left text-base"></i>
                </button>

                {/* Next Button */}
                <button
                  onClick={goToNext}
                  className="absolute top-1/2 right-20 transform -translate-y-1/2 bg-white/70 focus:outline-none px-2 rounded-full hover:bg-white"
                >
                  <i className="fas fa-chevron-right text-base"></i>
                </button>
              </div>
              {/* <!-- Room Title and View --> */}
              <div className="px-6 pb-4">
                <h3 className="font-semibold text-gray-900 text-base mb-1 font-serif">
                  {tripBookedData.data.name} trip
                </h3>
                <p className="text-gray-500 text-sm font-mono">
                  {tripData.description}
                </p>
              </div>
              {/* <!-- Features --> */}
              <div className="border-t border-gray-200 px-6 py-4 flex justify-between text-center text-gray-700 text-xs select-none">
                <div className="flex flex-col items-center space-y-1 w-1/3">
                  <i className="fa-solid fa-map-location text-lg"></i>
                  <span className="font-serif">Hotel available</span>
                </div>
                <div className="flex flex-col items-center space-y-1 w-1/3">
                  <i className="fas fa-snowflake text-lg"></i>
                  <span className="font-serif">Food available</span>
                </div>
                <div className="flex flex-col items-center space-y-1 w-1/3">
                  <i className="fa-solid fa-truck-pickup text-lg"></i>
                  <span className="font-serif">transport available</span>
                </div>
              </div>

              {/* booking details */}
              <div className="max-w-3xl  mx-auto border border-gray-300 rounded-lg p-5 mb-4 font-serif">
                <h2 className="text-gray-900 font-semibold text-lg mb-3">
                  Price details
                </h2>
                <div className="flex justify-between text-gray-700 text-sm mb-2">
                  <span className="font-semibold">Extras</span>
                  <span className="text-xs self-center">price</span>
                </div>
                <div>
                  <label className="flex items-center mb-2 cursor-pointer">
                    <input
                      type="radio"
                      name="extras"
                      value="no-extras"
                      defaultChecked
                      className="form-radio text-blue-600 border-gray-300 focus:ring-0"
                    />

                    <span className="ml-2 text-gray-700 text-sm">
                      No extras
                    </span>
                    <span className="ml-auto text-gray-700 text-sm">+ $0</span>
                  </label>
                  <label className="flex items-center mb-3 cursor-pointer">
                    <input
                      type="radio"
                      name="extras"
                      value="no-extras"
                      checked={selectedExtra === "no-extras"}
                      onChange={(e) => setSelectedExtra(e.target.value)}
                      className="form-radio text-blue-600 border-gray-300 focus:ring-0"
                    />
                    <span className="ml-2 text-gray-700 text-sm">
                      Trip price
                    </span>
                    <span className="ml-auto text-gray-700 text-sm">
                      + ${tripBookedData.data.price}
                    </span>
                  </label>
                </div>
                <div className="text-xs text-red-700 mb-3 flex items-center gap-1">
                  <span>Non-refundable</span>
                  <i className="fas fa-info-circle"></i>
                </div>
                <div className="flex flex-col items-end space-y-1 mb-4">
                  <span className="bg-green-700 text-white text-xs font-medium px-2 py-0.5 rounded">
                    $10% vat include
                  </span>
                  <a
                    href="#"
                    className="text-xs text-green-700 underline hover:text-gray-900"
                  >
                    {tripBookedData.data.duration} day/night
                  </a>
                  <div className="flex items-center gap-1">
                    <i className="fa-solid fa-id-badge text-lg text-green-700"></i>
                    <span className="text-base text-green-700">
                      {tripBookedData.data.people}
                    </span>
                    <span className="text-sm text-green-700">people</span>
                  </div>
                  <div className="text-sm font-semibold text-green-700">
                    ${tripBookedData.data.price} total
                  </div>

                  <div className="text-xs text-green-700 flex items-center gap-1">
                    <i className="fas fa-check"></i>
                    <span>Total includes taxes and fees</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-md py-2 mb-2"
                >
                  <CheckoutPayment trip={tripBookedData} />
                </button>
                <p className="text-center text-xs text-gray-600">
                  You will not be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Trip;
