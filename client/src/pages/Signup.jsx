import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function Signup() {
  const navigate = useNavigate();
  const [error, setError] = useState(""); // for error message
  const [success, setSuccess] = useState("");
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword); // Toggle password visibility state
  };

  const create = async (data) => {
    console.log(data);
    // console.log(setSstRegister(data));

    try {
      setError("");
      const { name, phoneNumber, email, password } = data;
      const response = await fetch("/api/v1/users/register", {
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
      });
      console.log(response);

      // to handle success or error useing the ok property of the response object, which indicates whether the request was successful
      if (!response.ok) {
        throw new Error(
          `Failed to register user. Server response with ${response.status}!`
        );

        // if (response.status === 409) {}
        //   throw new Error("username and email already exit");
      }

      const userData = await response.json();
      console.log(userData);

      setSuccess(`${userData.message}`);

      navigate("/login");
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
          <div className="mt-16 flex flex-col justify-center items-center gap-1">
            <Input
              {...register("name", { required: true })}
              label="Full Name : "
              placeholder=" "
              autoComplete="name"
              className="md:ml-8 md:w-[20rem] border "
            />

            <Input
              {...register("phoneNumber", { required: true })}
              label="phone-number:"
              placeholder=" "
              className="md:ml-1 md:w-[20rem] border "
            />

            <Input
              {...register("email", {
                required: true,
              })}
              label="Email : "
              placeholder=" "
              type="email"
              autoComplete="email"
              className="md:ml-[68px] md:w-[20rem] border "
            />

            <div className="relative">
              <Input
                {...register("password", { required: true })}
                label="Password : "
                type={showPassword ? "text" : "password"} // Use conditional rendering based on the showPassword state
                placeholder=" "
                className="md:ml-10 md:w-[20rem] border "
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
    </div>
  );
}

export default Signup;
