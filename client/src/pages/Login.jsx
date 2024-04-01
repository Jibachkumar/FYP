import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
// import { UseDispatch } from "react-redux";

import Input from "../components/Input.jsx";
// import { login } from "../store/authSlice";

function Login() {
  const [isSignup, setIsSignup] = useState(false);

  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  // useEffect(() => {}, [isSignup]);

  const login = () => {};

  return (
    <div className=" w-full">
      {/* overlay */}
      <div className=" absolute top-0 left-0 w-full h-full bg-black z-50 opacity-70"></div>

      <div className="absolute top-0 left-0 z-50 bg-slate-100 w-[70%] sm:w-[40%] rounded-xl shadow-2xl my-[2rem] mx-[4.5rem] sm:mx-[30%]">
        {/* <!-- close button  --> */}
        <button
          className=" absolute top-0 right-2 font-semibold text-4xl text-white cursor-pointer border-none bg-none hover:scale-105 transform transition duration-200 ease-in-out"
          onClick={() => navigate("/")}
        >
          &times;
        </button>

        <form>
          <div className=" text-center text-roman p-6 bg-sky-950">
            <h2 className="  font-semibold md:text-lg text-base text-white">
              Welcome to explore-
              <span className="">-nepal</span>
            </h2>
            <p className=" font-serif text-white">
              Create and customize your best interests
            </p>
          </div>
          <div className="mt-16 space-y-5">
            <Input
              label="Email : "
              placeholder="Email Address"
              type="email"
              {...register("email", {
                required: true,
              })}
              autoComplete="email"
            />
            <Input
              label="Password : "
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
            {/* <div className=" flex flex-col mb-6 justify-center items-center">
              <label
                htmlFor="email"
                className="text-[16px] font-medium font-serif"
              >
                Email
              </label>
              <input
                // type="email"
                id="email"
                type="text"
                className=" w-[18rem] md:w-[20rem] focus:outline-none border-b border-black opacity-[0.5] bg-transparent placeholder-gray-900"
              />
            </div>
            <div className="flex flex-col justify-center items-center">
              <label
                htmlFor="password"
                className="text-[16px] font-medium font-serif"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                className=" w-[18rem] md:w-[27rem] focus:outline-none border-b border-black opacity-[0.5] bg-transparent placeholder-black"
              />
            </div>
            */}
          </div>
          <div>
            <p className=" absolute top-[284px] right-[4rem] md:ml-[26rem]  font-roman font-medium text-blue-950 cursor-pointer hover:underline">
              forget password?
            </p>
            <div className=" text-center mt-14 mb-4">
              <button
                className=" bg-green-900 w-[20rem] sm:w-[27rem] py-[6px] rounded-2xl shadow-md text-white font-semibold font-sans hover:scale-105 transform transition duration-200 ease-in-out"
                type="submit"
              >
                Login
              </button>
            </div>
          </div>
        </form>
        <div className=" text-center font-semibold text-black mb-6">
          <p className="bg-gray-200 rounded-lg p-5 text-black font-medium text-roman cursor-pointer hover:underline">
            Don&apos;t have an Account?{" "}
            <Link to={"/signup"}>
              <span className="font-semibold">Sign up</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
