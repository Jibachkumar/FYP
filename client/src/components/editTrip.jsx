import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import CheckoutPayment from "./CheckoutPayment";

function TripContent() {
  const tripData = useSelector((state) => state.trip.tripData.tripData);
  console.log(tripData?.success);
  const { data } = tripData;
  console.log(data);

  return (
    <div className=" py-[3rem] w-full bg-slate-50">
      {tripData && (
        <div className=" w-full">
          <h2 className=" font-sans text-center mt-6 mb-4 text-base font-semibold text-slate-900">
            the booking details of your destination
          </h2>
          {/* cards render card */}
          <div className="w-full flex justify-center">
            <div className="w-full lg:ml-[4rem]">
              <div className="max-w-5xl mx-auto border bg-slate-800 rounded-md px-3 py-4 grid grid-cols-3 gap-2">
                {data.image.map((url) => (
                  <img
                    src={url}
                    alt={data.destination}
                    className="object-cover rounded-sm w-[14rem] h-[9rem]"
                  />
                ))}
              </div>
            </div>
            <div className="w-full">
              <div className="max-w-sm rounded-md shadow-sm border px-4 py-2 mb-3">
                <h2 className=" font-medium text-center font-sans my-2 text-red-950">
                  {" "}
                  your booking details
                </h2>
                <p className="border-b"></p>

                <p className="text-base font-semibold pt-2">
                  Check-In :
                  <span className="font-base text-lg pl-3">
                    {data?.startDate.split("T")[0] || "Data not found"}
                  </span>
                </p>
                <p className="pt-1">
                  Total length of stay : <br />
                  <span className="font-semibold text-base">
                    {data?.duration} days
                  </span>
                </p>
                <p className="pt-1 pb-3">
                  Total number of people: <br />{" "}
                  <span className="font-semibold text-base">
                    {data?.people}
                  </span>
                </p>
                <p className="border-t"></p>

                <p className="pt-3 text-center">your selected destination</p>
                <p className="font-bold text-xl text-blue-900 text-center">
                  {data?.destination
                    ? data.destination.charAt(0).toUpperCase() +
                      data.destination.slice(1)
                    : "data not found"}
                </p>
                {/* <p>price: {tripData?.data?.price}</p> */}
              </div>
              <div className=" max-w-sm rounded-md shadow-sm border ">
                <h2 className=" font-medium text-center font-sans my-3 text-red-950">
                  {" "}
                  your Price Summary
                </h2>
                <div className=" bg-sky-100 py-2 flex justify-between">
                  <p className="pl-4 text-lg font-bold">Total</p>
                  <p className="text-lg font-bold pl-3">
                    NPR {data?.price || "Data not found"} <br />
                    <span className=" text-sm font-normal pr-1">
                      Includes taxes and charges In property currency
                    </span>
                  </p>
                </div>
                <h2 className=" font-bold font-sans my-1 mx-4">
                  {" "}
                  Price Information
                </h2>
                <div className=" text-wrap text-xs pl-20">
                  <p className="py-2">
                    this price is converted to show you the approximate cost in
                    NPR, you'll pay in US$ or NPR the exhange card rate may
                    change before you pay
                  </p>
                  <p>
                    Bear in mind that you card issuer may change you a foreign
                    transaction fee.
                  </p>
                </div>

                <p className="border-b my-2"></p>

                <h2 className="font-bold font-sans my-1 mx-4">
                  your payment schedule
                </h2>
                <p className=" text-sky-700 text-center pb-3 underline">
                  no payment today, you will pay when you stay{" "}
                </p>
              </div>
              <div className=" mt-2">
                <CheckoutPayment trip={tripData} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TripContent;
