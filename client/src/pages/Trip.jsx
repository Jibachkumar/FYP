import React, { useEffect, useState, useRef } from "react";
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

function Trip() {
  const tripData = useSelector((state) => state.trip.trips);

  const { register, handleSubmit, control, watch, setValue } = useForm({
    defaultValues: {
      name: tripData?.name || "",
    },
  });

  useEffect(() => {
    if (tripData?.name) {
      setValue("destination", tripData.name); // ✅ Set on initial load
    }
  }, [tripData, setValue]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [dataSourceError, setDataSourceError] = useState("");
  const [activeTab, setActiveTab] = useState("information");
  const [searchInput, setSearchInput] = useState("");

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

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
        setValue("destination", matchDestination.name);
      } else {
        dispatch(getTrip("Sorry did not match destination name"));
        setValue("destination", "");
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
      navigate("/tripcontent");
    } catch (error) {
      console.log(error.message);
      new Error(error.message);
    }
  };

  return (
    <div className="w-full h-full mt-[3.6rem] bg-[#f9f7f0]">
      {tripData.images ? (
        <div className="w-full h-full">
          <img
            src={tripData.images[5].url}
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
                    <h2 className="text-lg font-bold">{tripData.name}</h2>
                    <p>This is the trip information.</p>

                    <div className=" flex gap-x-2">
                      {tripData.images?.slice(0, 3).map((img) => (
                        <img
                          key={img._id}
                          src={img.url}
                          alt={img._id}
                          className="w-[250px] h-[200px] object-cover rounded-sm"
                        />
                      ))}
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
                    {tripData.images.map((img) => (
                      <img
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
                          value={value ?? null}
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
                    defaultValue=""
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
    </div>
  );
}

export default Trip;
