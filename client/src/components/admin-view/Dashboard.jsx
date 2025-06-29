import { useState, useEffect, useRef } from "react";
import { useTripData } from "../hooks/useTripData";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { Spin } from "antd";

function Dashboard() {
  const [data, setTripData] = useState([]);
  const [tripEdit, setTripEdit] = useState(false);
  const [deleteDestinationView, setDeleteDestinationView] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const fileInputRef = useRef();
  const [loader, setLoader] = useState(false);

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: destinationName,
      images: [],
      price: "",
      duration: "",
      operated_in: "",
      age_range: "",
      description: "",
      type: "",
    },
  });

  useEffect(() => {
    if (destinationName && typeof destinationName === "string") {
      reset((prev) => ({
        ...prev,
        name: destinationName,
      }));
    }
  }, [destinationName, reset]);

  const editDestinationDetails = async (data) => {
    setLoader(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("duration", data.duration);
    formData.append("age_range", data.age_range);
    formData.append("operated_in", data.operated_in);
    formData.append("type", data.type);
    // ✅ Append multiple files
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file) => {
        formData.append("images", file);
      });
    } else {
      console.warn("No files selected.");
    }
    try {
      const response = await fetch("/api/v1/users/destination", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(
          `Failed to create trip. Server response with ${response.status}!`
        );
      }

      const tripData = await response.json();
      console.log(tripData);

      if (tripData) {
        setTripEdit(false);
        toast.success(tripData.message);
        reset({
          name: "",
          images: [],
          price: "",
          description: "",
          duration: "",
          age_range: "",
          operated_in: "",
          type: "",
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const fetchTrips = async () => {
      // setLoader(true);
      try {
        const response = await fetch(
          "http://localhost:7000/api/v1/users/trip/allbookedtrip"
        );

        if (!response.ok) {
          throw new Error(`${response.statusText}`);
        }

        const data = await response.json();
        console.log(data);
        setTripData(data.data);
      } catch (error) {
        console.log(error.message);
      } finally {
        // setLoader(false);
      }
    };

    fetchTrips();
  }, []);

  const { tripData, refetch } = useTripData();
  // console.log(tripData);

  const deleteDestination = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:7000/api/v1/users/deletetripbyid/${id}`,
        {
          method: "DELETE", // 👈 important!
        }
      );
      if (!response.ok) {
        throw new Error(`${response.statusText}`);
      }

      const data = await response.json();
      console.log(data);
      refetch();
      setDeleteDestinationView(null);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex min-h-screen">
        {/* Main content */}
        <div className="flex-1 p-2">
          {/* Heading and filter */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
            <h1 className="font-serif font-extrabold text-lg text-white/50">
              Overview
            </h1>
            {/* <div className="sm:ml-auto">
              <div
                className="inline-flex rounded-md bg-[#192458] text-white shadow-md text-xs font-semibold"
                role="group"
              >
                <button
                  type="button"
                  className="px-3 py-2 font-serif rounded-l-md hover:bg-gray-200"
                >
                  This week
                </button>
                <button
                  type="button"
                  className="px-3 py-2 font-serif  rounded-none font-bold"
                >
                  This month
                </button>
                <button
                  type="button"
                  className="px-3 py-2 font-serif rounded-r-md hover:bg-gray-200"
                >
                  This year
                </button>
              </div>
            </div> */}
          </div>

          {/* Stats */}
          <section className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-white/50 font-serif">
            <div className="bg-[#192458] shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2 ">
                <i className="fas fa-chart-line text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.total}</p>
                <p className="text-xs ">Total Booking</p>
              </div>
            </div>
            <div className="bg-[#192458] shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <i className="fas fa-cash-register text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.finalHighestName}</p>
                <p className="text-xs ">Highest Booked Trip</p>
              </div>
            </div>
            <div className="bg-[#192458] shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <span className="text-sm font-semibold">$</span>
              </div>
              <div className="text-right">
                <p className="font-semibold ">{data.totalEarnings}</p>
                <p className="text-xs ">Total Earning</p>
              </div>
            </div>
            <div className="bg-[#192458] shadow-md rounded-md p-4 flex flex-col justify-between">
              <div className="flex items-center mb-2">
                <i className="fas fa-list-ul text-sm"></i>
              </div>
              <div className="text-right">
                <p className="font-semibold ">1</p>
                <p className="text-[9px] ">1 higher from last week</p>
                <p className="text-xs ">Tickets</p>
              </div>
            </div>
          </section>

          {/* created trip view */}
          <section className=" font-serif mt-3 bg-[#192458] shadow-md rounded-md pl-4 py-4">
            <div className=" overflow-y-auto max-h-[28rem]">
              <div className="grid grid-cols-4 gap-4 pr-4">
                {tripData &&
                  tripData.map((trip, i) => (
                    <div
                      key={i}
                      className="flex justify-between text-white/50 items-center bg-[#212b5f] rounded-xl p-4 flex-1 min-w-[120px]"
                      onClick={() => {
                        setTripEdit(true);
                        setDeleteDestinationView(null);
                        // Delay setting name slightly so form has time to mount
                        setTimeout(() => {
                          setDestinationName(trip.name);
                        }, 0);
                      }}
                    >
                      <div>
                        <div className="flex justify-between">
                          <p className="text-xs font-semibold  mb-1">
                            {trip.name.charAt(0).toUpperCase() +
                              trip.name.slice(1)}
                          </p>
                          <div
                            className="bg-black w-10 h-10 relative -top-4 rounded-full flex justify-center items-center cursor-pointer"
                            aria-label="Project completed icon"
                          >
                            <i
                              className="fa-solid fa-trash text-white/65 text-lg"
                              onClick={(e) => {
                                e.stopPropagation(); // 👈 Prevents parent div click
                                setDeleteDestinationView(trip._id);
                              }}
                            />
                          </div>
                        </div>
                        <div className=" overflow-hidden h-[120px]">
                          <img src={trip.images[2].url} alt={trip.name} />
                        </div>
                      </div>

                      {deleteDestinationView === trip._id && (
                        <div className="fixed inset-0 w-2/5 top-[40%] left-52 bg-white max-w-5xl h-52 rounded-md z-50 mx-auto">
                          <div className=" flex flex-col justify-center items-center text-black py-4">
                            <label className="text-black text-lg font-semibold">
                              Are you sure you want to delete the Package?
                            </label>

                            <label htmlFor={trip.name}>
                              Destination Name:{" "}
                              <span className="text-green-700">
                                {trip.name.charAt(0).toUpperCase() +
                                  trip.name.slice(1)}
                              </span>
                            </label>

                            <div className="pt-5">
                              <button
                                className=" text-red-500 bg-slate-800 rounded-md shadow-md px-3 py-1 focus:outline-none hover:scale-105  transition duration-300 ease-in-out"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteDestination(trip._id);
                                }}
                              >
                                Delete
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation(); // 🔥 prevents card's editTrip from firing
                                  setDeleteDestinationView(null); // hide confirmation
                                }}
                                className="ml-4 text-red-500 bg-slate-800 rounded-md shadow-md px-3 py-1 focus:outline-none hover:scale-105  transition duration-300 ease-in-out"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </section>

          {tripEdit && (
            // <div className=" absolute font-serif top-0 bg-white shadow-md rounded-md p-4 z-50">
            <div className="relative -top-2/4 bg-white rounded-md max-w-5xl mx-auto">
              {/* <!-- Close button top right --> */}
              <div className="border-b p-2">
                <button
                  onClick={() => setTripEdit(false)}
                  aria-label="Close"
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black bg-opacity-70 flex items-center justify-center text-white text-xl hover:bg-opacity-90 transition"
                >
                  <i className="fas fa-times"></i>
                </button>

                {/* <!-- Top filter section --> */}
                <div className="flex items-center justify-center space-x-6 text-xs text-gray-600 font-semibold select-none">
                  <label
                    htmlFor="label"
                    className="font-serif text-lg font-bold text-green-700"
                  >
                    Edit Trip
                  </label>
                </div>
              </div>

              {/* <!-- Package Name tabs --> */}
              <div className="flex justify-between space-x-3 py-2 px-4 text-xs font-semibold">
                <button className="bg-[#00a88f] text-white font-serif rounded px-3 py-1.5 border border-[#00a88f] focus:outline-none">
                  Mustang
                </button>
              </div>

              <form
                onSubmit={handleSubmit(editDestinationDetails)}
                className=" text-black px-4 rounded-md w-full"
              >
                <label
                  htmlFor="image"
                  className="block text-sm font-medium mb-1 font-serif"
                >
                  Add Images <span className="text-red-600">*</span>
                </label>

                <Controller
                  name="images"
                  control={control}
                  rules={{ required: "Please select a file." }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <>
                      <div
                        className="border border-dotted bg-slate-50 border-slate-900 rounded-md h-16 flex justify-center items-center cursor-pointer hover:border-white transition"
                        onClick={handleBrowseClick}
                      >
                        <span className="text-black font-serif text-xs">
                          {value && value.length > 0
                            ? `${value.length} file selected`
                            : "Drag & Drop your files or Browser"}
                        </span>
                        <input
                          type="file"
                          multiple
                          ref={fileInputRef}
                          className="hidden"
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            onChange(files); // this updates the RHF value
                          }}
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-xs mt-1">
                          {error.message}
                        </p>
                      )}
                    </>
                  )}
                />

                <div className="flex flex-col gap-3">
                  {/* <!-- Destination Name --> */}
                  <div className="hidden">
                    <label
                      htmlFor="destination name"
                      className="font-medium text-sm font-serif mb-1"
                    >
                      Destination Name :
                    </label>
                    <input {...register("name", { required: true })} />
                  </div>

                  {/* <!-- Description --> */}
                  <div className="mt-2">
                    <label
                      htmlFor="description"
                      className="block font-medium text-sm font-serif mb-1"
                    >
                      Description <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      {...register("description", { required: true })}
                      className="w-full p-2 border border-gray-300 bg-slate-50 hover:outline-none text-gray-900 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 rounded-md resize-none break-words"
                      rows="2"
                      placeholder="Write your description..."
                    ></textarea>
                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        please write the description
                      </p>
                    )}
                  </div>

                  {/* <!-- Price --> */}
                  <div className="flex items-center gap-x-14 ">
                    <label
                      htmlFor="price"
                      className="font-medium text-sm font-serif mb-1"
                    >
                      Price :
                    </label>
                    <input
                      {...register("price", { required: true })}
                      placeholder="price"
                      className="w-96 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.price && (
                      <p className="text-red-500 text-xs mt-1">
                        please enter the price
                      </p>
                    )}
                  </div>

                  {/* <!-- Duration--> */}
                  <div className="flex gap-x-8">
                    <label
                      htmlFor="duration"
                      className="block font-medium text-sm font-serif mb-1"
                    >
                      Duration :
                    </label>
                    <input
                      {...register("duration", { required: true })}
                      placeholder="Duration"
                      className="w-96 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.duration && (
                      <p className="text-red-500 text-xs mt-1">
                        please enter the duration
                      </p>
                    )}
                  </div>

                  {/* <!-- Operated In --> */}
                  <div className="flex gap-x-3">
                    <label
                      htmlFor="operated_in"
                      className="block font-medium text-sm font-serif mb-1"
                    >
                      Operated In :
                    </label>
                    <input
                      {...register("operated_in", { required: true })}
                      placeholder="Operated In"
                      className="w-96 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.operated_in && (
                      <p className="text-red-500 text-xs mt-1">
                        please write the value
                      </p>
                    )}
                  </div>

                  {/* <!-- Age range --> */}
                  <div className="flex gap-x-6">
                    <label
                      htmlFor="age_range"
                      className="block font-medium text-sm font-serif mb-1"
                    >
                      Age Range:
                    </label>
                    <input
                      {...register("age_range", { required: true })}
                      placeholder="Age Range"
                      className="w-96 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.age_range && (
                      <p className="text-red-500 text-xs mt-1">
                        please enter the value
                      </p>
                    )}
                  </div>

                  {/* <!-- type --> */}
                  <div className="flex gap-x-14">
                    <label
                      htmlFor="type"
                      className="block font-medium text-sm font-serif mb-1"
                    >
                      Type :
                    </label>
                    <input
                      {...register("type", { required: true })}
                      placeholder="Type"
                      className="w-96 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1">
                        please enter the type of destination
                      </p>
                    )}
                  </div>
                </div>

                {/* <!-- Bottom buttons --> */}
                <div className="flex  justify-center mt-8 text-xs font-semibold text-[#00a88f] pb-4">
                  <button
                    type="submit"
                    className="bg-[#00a88f] font-serif text-white text-center rounded px-6 py-2 focus:outline-none hover:bg-[#00806f] transition"
                  >
                    Proceed To Edit
                  </button>
                  {loader && (
                    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                      <Spin />
                    </div>
                  )}
                </div>
              </form>
            </div>
            // </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
