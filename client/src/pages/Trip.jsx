import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import { List } from "antd";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { trip as tripSlice } from "../store/tripSlice.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Trip() {
  const { register, handleSubmit, control, trigger, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [date, setDates] = useState(dayjs());
  const [selectedDuration, setSelectedDuration] = useState(3); // Initialize selectedDuration state
  const [dataSourceError, setDataSourceError] = useState("");

  const inputFields = [
    {
      label: "What destination would be your favorite to visit next?",
      name: "destination",
      placeholder: "Enter places where you wanna go",
      type: "text",
      defaultValue: "",
    },
    {
      label: "Choose the start date for your vacation",
      name: "startDate",
      type: "date",
      defaultValue: date,
    },
    {
      label: "Select the duration of your trip",
      name: "duration",
      options: [3, 5, 7, 10],
    },
    {
      label: "How many people are with you on this trip?",
      name: "people",
      placeholder: "Enter Number of People",
    },
  ];

  const setError = (value) => {
    if (value <= 0) {
      setDataSourceError("Value must be greater than or equal to 0");
      return false; // Prevent form submission
    }
    setDataSourceError(""); // Clear the error message if validation passes
    return true; // Allow form submission
  };

  const navigateInput = (direction) => {
    setCurrentInputIndex((prevIndex) => {
      if (direction === "back" && prevIndex > 0) {
        return prevIndex - 1;
      }
      if (direction === "next" && prevIndex < inputFields.length - 1) {
        return prevIndex + 1;
      }
      return prevIndex;
    });
  };

  const goBack = () => {
    navigateInput("back");
  };

  const goNext = () => {
    navigateInput("next");
  };

  const createTrip = async (data) => {
    //const tripDetails = JSON.parse(JSON.stringify(data));
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

      const tripData = await response.json();
      console.log("tripData: ", tripData);

      if (!response.ok) {
        throw new Error(`log in Error ${response.status}`);
      }

      console.log(tripData.message);
      // console.log(tripData.tripData.data);

      if (!tripData) throw new Error(tripData.message);
      dispatch(tripSlice({ tripData: tripData }));

      navigate("/tripcontent");

      //reset();
    } catch (error) {
      console.log(error.message);
      new Error(error.message);
    }
  };

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const renderCurrentInput = () => {
    const field = inputFields[currentInputIndex];
    if (field.name === "destination") {
      //console.log(field);
      return (
        <>
          <div className="w-full text-center mt-[5rem]">
            <Input
              {...field}
              {...register(field.name, {
                required: true,
                validate: (value) => setError(value),
              })}
              className={`lg:w-[20rem] border border-green-500 sm:h-10 font-serif shadow-md`}
            />
            {dataSourceError && (
              <p className=" text-red-500 ">{dataSourceError}</p>
            )}
          </div>
        </>
      );
    } else if (field.type === "date") {
      return (
        <>
          <h2 className="mb-8 text-[17px] font-semibold font-serif text-center">
            {field.label}
          </h2>
          <Controller
            name={field.name}
            control={control}
            defaultValue={field.defaultValue}
            render={({ field }) => (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <StaticDatePicker
                  orientation="portrait"
                  openTo="day"
                  value={field.value}
                  onChange={(newValue) => {
                    field.onChange(newValue);
                    setDates(newValue);
                  }}
                  className="bg-white rounded-xl border-3 border-slate-300 focus:outline-none text-base text-black"
                />
              </LocalizationProvider>
            )}
          />
        </>
      );
    } else if (field.name === "duration") {
      return (
        <>
          <h2 className="mb-8 text-[17px] font-semibold font-serif text-center">
            {field.label}
          </h2>

          <Controller
            name={field.name}
            control={control}
            defaultValue={selectedDuration}
            render={({ field }) => (
              <List
                size="large"
                bordered
                dataSource={[3, 5, 7, 9, 10, 12, 15]}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => {
                      console.log(item);
                      field.onChange(item);
                      handleDurationSelection(item); // Update selectedDuration
                    }}
                    className={
                      selectedDuration === item ? "selected" : "text-[15px]"
                    }
                    style={{
                      color: "blue",
                      cursor: "pointer",
                      textAlign: "center",
                      font: "-moz-initial",
                      fontWeight: "bolder",
                      backgroundColor:
                        selectedDuration === item ? "#6c5ce7" : "transparent",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#6c5ce7";
                      e.target.style.borderRadius = "1rem";
                      e.target.style.padding = "0.6rem";
                    }}
                    onMouseLeave={(e) => {
                      if (selectedDuration !== item) {
                        e.target.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    {item} days
                  </List.Item>
                )}
              />
            )}
          />
        </>
      );
    } else {
      return (
        // TODO: do not repeat your self
        <div className="w-full text-center mt-[5rem]">
          {dataSourceError && (
            <p className=" text-red-500 ">{dataSourceError}</p>
          )}
          <Input
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.name, {
              required: true,
              validate: (value) => setError(value),
            })}
            className={`lg:w-[16rem] border border-green-500 sm:h-10 font-serif shadow-md `}
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full pb-32 bg-white h-screen">
      <div
        className={`relative top-20 flex  ${
          currentInputIndex === 0 ? " justify-end " : "justify-between"
        } `}
      >
        <button
          type="button"
          onClick={goBack}
          disabled={currentInputIndex === 0}
          className={`text-black px-4 py-2 rounded-md shadow-md mr-2 border hover:scale-105 hover:outline-none transform transition duration-200 ease-in-out ${
            currentInputIndex === 0 ? " hidden" : ""
          }`}
        >
          <svg
            className="w-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={currentInputIndex === inputFields.length - 1}
          className={`text-black px-4 py-2 rounded-md shadow-md border hover:scale-105 hover:outline-none transform transition duration-200 ease-in-out ${
            currentInputIndex === inputFields.length - 1 ? " hidden" : ""
            // opacity-50 cursor-not-allowed
          }`}
        >
          <svg
            className="w-5 ml-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>

      <div className="max-w-md mx-auto">
        <form onSubmit={handleSubmit(createTrip)}>
          <div>
            {inputFields.map((_, index) => (
              <div key={index}>
                {currentInputIndex === index && renderCurrentInput()}
              </div>
            ))}
          </div>
          {currentInputIndex === inputFields.length - 1 && (
            <button
              type="submit"
              className="md:ml-[10.5rem] my-8 flex justify-center items-center bg-indigo-700 font-serif text-lg font-medium text-white px-7 rounded-md py-1"
            >
              submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default Trip;
