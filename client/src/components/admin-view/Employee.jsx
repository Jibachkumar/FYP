import React from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";

function post() {
  const { register, handleSubmit, reset } = useForm();

  const postTrip = async (data) => {
    console.log(data);

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
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="text-sm text-blue-900">
      <div className="max-w-7xl mx-auto p-6 bg-white border border-gray-300 mt-4 rounded-sm">
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
      </div>
    </div>
  );
}

export default post;
