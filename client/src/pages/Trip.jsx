import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../components/Input";
import { List } from "antd";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { trip } from "../store/tripSlice.js";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Trip() {
  const { register, handleSubmit, control, reset } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentInputIndex, setCurrentInputIndex] = useState(0);
  const [date, setDates] = useState(dayjs());
  const [selectedDuration, setSelectedDuration] = useState(3); // Initialize selectedDuration state

  const inputFields = [
    {
      label: "What destination would be your favorite to visit next?",
      name: "destination",
      placeholder: "Enter places where you wanna go",
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
      label: "Who will be on this trip with you?",
      name: "people",
      placeholder: "Enter Number of People",
    },
  ];

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

      if (!response.ok) {
        throw new Error(`log in Error ${response.status}!`);

        // if (response.status === 409) {}
        //   throw new Error("username and email already exit");
      }
      const tripData = await response.json();
      console.log(tripData);

      dispatch(trip({ tripData }));
      const tripAction = trip({ tripData }); // Creating the action object
      console.log(tripAction); // Logging the dispatched action object
      navigate("/tripcontent");

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDurationSelection = (duration) => {
    setSelectedDuration(duration);
  };

  const renderCurrentInput = () => {
    const field = inputFields[currentInputIndex];
    if (field.type === "date") {
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
                dataSource={[3, 5, 7, 10, 12, 15, 20]}
                renderItem={(item) => (
                  <List.Item
                    onClick={() => {
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
        <div className="w-full mt-8 text-center">
          <Input
            label={field.label}
            placeholder={field.placeholder}
            {...register(field.name, { required: true })}
            className={`mt-10 border border-green-500 sm:h-10 font-serif shadow-md`}
          />
        </div>
      );
    }
  };

  return (
    <div className="w-full pb-32 bg-white">
      <div className="mt-[3rem] flex justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={currentInputIndex === 0}
          className={`bg-slate-200 text-black font-semibold px-10px py-2px rounded-2xl shadow-md mr-2px border border-slate-300 hover:scale-105 transform transition duration-200 ease-in-out ${
            currentInputIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Back
        </button>

        <button
          type="button"
          onClick={goNext}
          disabled={currentInputIndex === inputFields.length - 1}
          className={`bg-slate-200 text-black font-semibold px-10px py-2px rounded-2xl shadow-md mr-2px border border-slate-300 hover:scale-105 transform transition duration-200 ease-in-out ${
            currentInputIndex === inputFields.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          Next
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
        </form>
      </div>
    </div>
  );
}

export default Trip;
