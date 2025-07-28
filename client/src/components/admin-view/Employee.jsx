import { useState, useEffect, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import { useTripData } from "../hooks/useTripData";
import { Spin } from "antd";

function post() {
  const [tripEdit, setTripEdit] = useState(false);
  const [deleteDestinationView, setDeleteDestinationView] = useState(null);
  const [destinationName, setDestinationName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const fileInputRef = useRef();
  const [loader, setLoader] = useState(false);
  const [loaderEditTrip, setLoaderEditTrip] = useState(false);

  const { tripData, refetch } = useTripData();

  const handleBrowseClick = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    getValues,
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
    console.log(data);
    setLoaderEditTrip(true);

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
      setLoaderEditTrip(false);
    }
  };

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

  const postTrip = async (data) => {
    console.log(data);
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
    for (let i = 0; i < data.images.length; i++) {
      formData.append("images", data.images[i]);
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

      if (tripData) {
        toast.success(tripData.message);
      }
      reset();
      refetch();
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };
  return (
    <div className="text-sm text-blue-900">
      <div className="max-w-7xl mx-auto p-6 bg-white border border-gray-300 my-4 rounded-sm">
        <h2 className="font-extrabold font-serif text-xl mb-3">POST TRIP</h2>

        <form
          onSubmit={handleSubmit(postTrip)}
          className="space-y-4 font-serif"
        >
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label for="store-name" className="block font-semibold mb-1">
                Destination name <span className="text-red-600">*</span>
              </label>
              <input
                {...register("name", { required: true })}
                type="text"
                placeholder="destination name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label for="number" className="block font-semibold mb-1">
                Duration.
              </label>
              <input
                {...register("duration", { required: true })}
                type="text"
                placeholder="duration."
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label for="date" className="block font-semibold mb-1">
                Start Date.
              </label>
              <input
                {...register("startDate", { required: true })}
                type="text"
                placeholder="startDate"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>

            <div>
              <label for="number" className="block font-semibold mb-1">
                Type.
              </label>
              <input
                {...register("type", { required: true })}
                type="text"
                placeholder="type"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label for="phone" className="block font-semibold mb-1">
                Age_range
              </label>
              <input
                {...register("age_range", { required: true })}
                type="text"
                placeholder="age range"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label for="vat" className="block font-semibold mb-1">
                Operated_in
              </label>
              <input
                {...register("operated_in", { required: true })}
                type="text"
                placeholder="operated in"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label for="street" className="block font-semibold mb-1">
                Price
              </label>
              <input
                {...register("price", { required: true })}
                type="text"
                placeholder="price"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
            <div>
              <label for="itinerary" className="block font-semibold mb-1">
                Itinerary
              </label>
              <input
                {...register("itinerary", { required: true })}
                type="text"
                placeholder="itinerary"
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block font-semibold mb-1">Image</label>
            <input
              {...register("images", {
                required: true,
                validate: (files) =>
                  files.length > 0 || "At least one image is required",
              })}
              type="file"
              multiple
              className="block
                file:mr-4 file:py-1 file:px-4
                file:rounded file:border file:border-slate-300
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-slate-700
                hover:file:bg-blue-100 border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
            />
          </div>

          <div>
            <label for="email" className="block font-semibold mb-1">
              Description <span className="text-red-600">*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="lg:w-[38rem] w-full p-2 border border-gray-300 hover:outline-none text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400 rounded-md resize-none break-words"
              rows="4"
              placeholder="Write your description..."
            ></textarea>
          </div>

          <div className="">
            <button
              type="submit"
              className="inline-flex items-center space-x-3 bg-blue-700 text-white text-xs font-semibold px-5 py-2 rounded-md shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-800"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17 3a1 1 0 01.993.883L18 4v12a1 1 0 01-.883.993L17 17H3a1 1 0 01-.993-.883L2 16V4a1 1 0 01.883-.993L3 3h14zm-4 6H7v2h6V9z" />
              </svg>
              <span>POST</span>
            </button>
          </div>
        </form>
        {loader && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
            <Spin />
          </div>
        )}
      </div>

      {/* created trip view */}
      <section className="max-w-7xl mx-auto font-serif mb-3 bg-white border border-gray-300 rounded-md pl-4 py-4">
        <h2 className="font-semibold font-serif text-xl mb-1">
          Posted Trip Package
        </h2>
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
                        {trip.name.charAt(0).toUpperCase() + trip.name.slice(1)}
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
                    <div className="fixed inset-0 w-2/5 top-[42%] left-52 bg-white max-w-5xl h-52 rounded-md z-50 mx-auto">
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
        {tripEdit && (
          // <div className=" absolute font-serif top-0 bg-white shadow-md rounded-md p-4 z-50">
          <div className="absolute -mt-[29rem] bg-white border rounded-xl w-3xl left-1/2 -translate-x-1/2">
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
              <div>
                <input
                  {...register("images", {
                    required: true,
                    validate: (files) =>
                      files.length > 0 || "At least one image is required",
                  })}
                  type="file"
                  multiple
                  className="block
          file:mr-4 file:py-1 file:px-4
          file:rounded file:border file:border-slate-300
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-slate-700
          hover:file:bg-blue-100 border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                />

                {/* You can also show errors similarly */}
                {errors.images && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.images.message}
                  </p>
                )}
              </div>

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
                <div className=" grid grid-cols-2">
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
                      className="w-60 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
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
                      className="w-60 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
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
                      className="w-60 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
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
                      className="w-60 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
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
                      className="w-60 border border-gray-300 rounded-md h-7 placeholder-gray-400 placeholder:text-xs placeholder:font-serif focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-blue-400"
                    />
                    {errors.type && (
                      <p className="text-red-500 text-xs mt-1">
                        please enter the type of destination
                      </p>
                    )}
                  </div>
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
                {loaderEditTrip && (
                  <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
                    <Spin />
                  </div>
                )}
              </div>
            </form>
          </div>
          // </div>
        )}
      </section>
    </div>
  );
}

export default post;
