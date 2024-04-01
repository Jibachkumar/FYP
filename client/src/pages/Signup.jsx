import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { login } from "../store/authSlice.js";
import { useDispatch } from "react-redux";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // for error message
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  // const [isregister, setSstRegister] = useState({});

  const create = async (data) => {
    console.log(data);
    // console.log(setSstRegister(data));

    try {
      setError("");
      const { name, phoneNumber, email, password } = data;
      const response = await fetch(
        "http://localhost:7000/api/v1/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: name,
            phoneNumber: phoneNumber,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to register user. Server response with ${response.status}`
        );
      }

      const userData = await response.json();
      console.log(userData);

      dispatch(login({ userData }));
      navigate("/");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
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
          <div className="mt-16 space-y-5 text-center">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder="Enter your full name"
              autoComplete="name"
            />

            <Input
              {...register("phoneNumber", { required: true })}
              label="phone-number: "
              placeholder="Enter your phone number"
            />

            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder="Enter your Email Address"
              type="email"
              autoComplete="email"
            />

            <Input
              {...register("password", { required: true })}
              label="Password : "
              type="password"
              placeholder="Enter your Password"
            />
          </div>
          <div>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
            <div className=" text-center mt-14 mb-4">
              <button
                type="submit"
                className=" bg-green-900 w-[20rem] md:w-[27rem] py-[6px] rounded-2xl shadow-md text-white font-semibold font-sans hover:scale-105 transform transition duration-200 ease-in-out"
              >
                create
              </button>
            </div>
          </div>
        </form>
        <div className=" text-center font-semibold text-black mb-6">
          <p className="bg-gray-200 rounded-lg p-5 text-black font-medium text-roman cursor-pointer hover:underline">
            Don&apos;t have an Account?{" "}
            <Link to={"/login"}>
              <span className="font-semibold">login</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
