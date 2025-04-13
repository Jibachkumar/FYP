import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login as authLogin } from "../store/authSlice.js";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { Spin } from "antd";

import Input from "../components/Input.jsx";

function Login() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  // useEffect(() => {}, [isSignup]);

  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle password visibility state
  };

  const login = async (data) => {
    console.log(data);
    setLoader(true); // Set loader state to true before initiating login

    // Simulate a delay of 1 second (1000 milliseconds)
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    try {
      setError("");
      const { email, password } = data;
      if (!email || !password) throw new Error("empty email or password !");

      const response = await fetch("/api/v1/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status}!`);
      }

      const userData = await response.json();

      console.log(userData.message);

      if (userData) {
        dispatch(authLogin(userData));
        navigate("/");
        setSuccess(userData.message);
        console.log(userData.message);
      }
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className=" w-full bg-slate-900">
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

        <form onSubmit={handleSubmit(login)}>
          <div className=" text-center text-roman p-6 bg-sky-950 w-full h-full">
            <h2 className="  font-semibold md:text-lg text-base text-white">
              Welcome to explore-
              <span className="">-nepal</span>
            </h2>
            <p className=" font-serif text-white">
              Create and customize your best interests
            </p>
          </div>
          <div className="mt-16 space-y-4 flex flex-col justify-center items-center">
            <Input
              autoComplete="auto"
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
              className="md:ml-6 md:w-[20rem]  p-[4px]"
            />
            <div className="relative">
              <Input
                autoComplete="off"
                {...register("password", { required: true })}
                label="Password : "
                type={showPassword ? "text" : "password"} // Use conditional rendering based on the showPassword state
                placeholder="Enter your Password"
                className="md:w-[20rem]  p-[4px]"
              />
              {/* Toggle button to show/hide password */}
              <button
                type="button"
                className="absolute  right-1 top-1/2 transform -translate-y-1/2 opacity-60"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}{" "}
                {/* Use eye icons */}
              </button>
            </div>
          </div>
          <div>
            <p className="flex justify-center font-roman font-medium text-blue-950 cursor-pointer hover:underline">
              forget password?
            </p>

            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            {success && (
              <p className="text-red-600 mt-8 text-center">{success}</p>
            )}

            <div className="text-center mt-10 mb-4">
              <button
                className=" bg-sky-900 md:w-[25rem] w-[18rem] py-[6px] rounded-2xl shadow-md text-white font-semibold font-sans hover:scale-105 transform transition duration-200 ease-in-out"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className=" text-center font-semibold text-black">
          <p className="bg-gray-200 rounded-lg p-3 text-black font-medium text-roman cursor-pointer underline">
            Don&apos;t have an Account?{" "}
            <Link to={"/signup"}>
              <span className="font-semibold">Sign up</span>
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

export default Login;
