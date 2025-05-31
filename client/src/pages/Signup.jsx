import React, { useState, useEffect } from "react";
import { Link, resolvePath, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Spin } from "antd";
import { ToastContainer, toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(""); // for error message
  const [success, setSuccess] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const handleAvatarChange = (event) => {
    setAvatar(event.target.files[0]); // Store the selected Avatar file
    console.log(event.target.files[0]);
  };

  const handleCoverImageChange = (event) => {
    setCoverImage(event.target.files[0]); // Store the selected Cover Image file
    console.log(event.target.files[0]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle password visibility state
  };

  const create = async (data) => {
    setLoader(true);

    try {
      setError("");
      const formData = new FormData();
      formData.append("userName", data.userName); // Note: using "userName" here
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("email", data.email);
      formData.append("avatar", avatar); // Assuming avatar is a file input
      formData.append("coverImage", coverImage); // Assuming coverImage is a file input
      formData.append("password", data.password);

      const response = await fetch("/api/v1/users/register", {
        method: "POST",
        body: formData,
      });
      console.log(response);

      if (!response.ok) {
        throw new Error(
          `Failed to register user. Server response with ${response.status}!`
        );
      }

      const userData = await response.json();

      if (userData) {
        setSuccess(`${userData.message}`);
        sessionStorage.setItem("toastMessage", userData.message);
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className=" w-full h-screen ">
      {/* overlay */}
      <div className=" absolute top-0 left-0 w-full h-full bg-black z-50 opacity-60 blur-[20rem]"></div>

      <div className="absolute top-0 left-0 z-50 bg-slate-100 w-[70%] sm:w-[35%] rounded-xl shadow-2xl my-[2rem] mx-[4.5rem] sm:mx-[30%]">
        {/* <!-- close button  --> */}
        <button
          className=" absolute top-0 right-2 font-semibold text-4xl text-white cursor-pointer border-none bg-none hover:scale-105 transform transition duration-200 ease-in-out"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <form onSubmit={handleSubmit(create)}>
          <div className=" text-center text-roman p-6 bg-sky-950">
            <h2 className="  font-semibold md:text-lg text-base text-white">
              Welcome to explore-
              <span className="">-nepal</span>
            </h2>
            <p className=" font-serif text-white">
              Create and customize your best interests
            </p>
          </div>
          <div className="mt-16 flex flex-col justify-center items-center gap-1">
            <Input
              {...register("userName", { required: true })}
              label="Full Name : "
              placeholder=" "
              autoComplete="name"
              className="md:ml-8 md:w-[20rem] border  p-[4px]"
            />

            <Input
              {...register("phoneNumber", { required: true })}
              label="phone-number:"
              placeholder=" "
              className="md:ml-1 md:w-[20rem] border  p-[4px]"
            />

            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder=" "
              type="email"
              autoComplete="email"
              className="md:ml-[68px] md:w-[20rem] border  p-[4px]"
            />

            <Input
              {...register("avatar", { required: true })}
              type="file"
              label="Avatar : "
              placeholder=""
              className="md:ml-[68px] md:w-[20rem] border"
              style={{ paddingLeft: "1px" }}
              onChange={handleAvatarChange}
            />
            <Input
              {...register("coverImage", { required: true })}
              type="file"
              label="Cover Image : "
              placeholder=""
              className="md:ml-[26px] md:w-[20rem] border"
              onChange={handleCoverImageChange}
            />

            <div className="relative">
              <Input
                {...register("password", { required: true })}
                label="Password : "
                type={showPassword ? "text" : "password"} // Use conditional rendering based on the showPassword state
                placeholder=" "
                className="md:ml-10 md:w-[20rem] border  p-[4px]"
              />
              {/* Toggle button to show/hide password */}
              <button
                type="button"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 opacity-60"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}{" "}
                {/* Use eye icons */}
              </button>
            </div>
          </div>
          <div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            {success && (
              <p className="text-red-600 mt-8 text-center">{success}</p>
            )}

            <div className=" text-center mt-8 mb-4">
              <button
                type="submit"
                className=" bg-sky-900 w-[20rem] md:w-[25rem] py-[6px] rounded-2xl shadow-md text-white font-semibold font-sans hover:scale-105 transform transition duration-200 ease-in-out"
              >
                create
              </button>
            </div>
          </div>
        </form>
        <div className=" text-center font-semibold text-black">
          <p className="bg-gray-200 rounded-lg p-3 text-black font-medium text-roman cursor-pointer underline">
            Don&apos;t have an Account?{" "}
            <Link to={"/login"}>
              <span className="font-semibold">login</span>
            </Link>
          </p>
        </div>
      </div>
      {loader && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-opacity-50 z-50">
          <Spin />
        </div>
      )}
    </div>
  );
}

export default Signup;
