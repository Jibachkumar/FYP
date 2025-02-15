import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import CheckoutPayment from "./CheckoutPayment";

function TripContent() {
  //const [data, setdata] = useState(null);
  const tripData = useSelector((state) => state.trip.tripData.tripData);
  // console.log("Full Redux State:",JSON.stringify(useSelector((state) => state.trip),   null,2));
  // console.log(JSON.stringify(tripData, null, 2));
  //console.log(tripData);
  //console.log(tripData.data);
  console.log(tripData?.success);

  useEffect(() => {
    if (!tripData) return;
    // setdata(tripData);
    console.log(tripData);
  }, [tripData]);

  return (
    <div className=" py-[3rem] w-full bg-slate-50">
      {tripData && (
        <div className=" w-full">
          <h2 className=" font-sans text-center mt-6 mb-4 text-base font-semibold text-slate-900">
            the booking details of your destination
          </h2>
          {/* cards render card */}
          <div className="w-full flex justify-center">
            <div className="w-full">
              <div className="rounded-md shadow-sm border mr-4">
                <p>
                  Destination: {tripData?.data?.destination || "data not found"}
                </p>
                <p>
                  Start Date: {tripData?.data?.startDate || "Data not found"}
                </p>
                <p>Duration: {tripData?.data?.duration} days</p>
                <p>People: {tripData?.data?.people}</p>
                <p>price: {tripData?.data?.price}</p>
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
                    {tripData?.data?.startDate.split("T")[0] ||
                      "Data not found"}
                  </span>
                </p>
                <p className="pt-1">
                  Total length of stay : <br />
                  <span className="font-semibold text-base">
                    {tripData?.data?.duration} days
                  </span>
                </p>
                <p className="pt-1 pb-3">
                  Total number of people: <br />{" "}
                  <span className="font-semibold text-base">
                    {tripData?.data?.people}
                  </span>
                </p>
                <p className="border-t"></p>

                <p className="pt-3 text-center">your selected destination</p>
                <p className="font-bold text-xl text-blue-900 text-center">
                  {tripData?.data?.destination
                    ? tripData.data.destination.charAt(0).toUpperCase() +
                      tripData.data.destination.slice(1)
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
                    NPR {tripData?.data?.price || "Data not found"} <br />
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

      {/* <h2 className=" text-center font-semibold text-lg mb-12">my Blog</h2>
      <div className="flex flex-wrap justify-center  gap-16 w-full  mx-auto p-6">
        <div className=" bg-orange-300 w-[23rem] rounded-md shadow-md overflow-hidden">
          <img
            className="w-[23rem]  h-[18rem] object-cover shadow-md transform transition duration-600 hover:scale-105"
            src="https://images.pexels.com/photos/20726113/pexels-photo-20726113/free-photo-of-a-view-of-the-city-of-siena-italy.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
          />
          <div className=" p-4">
            <p>
              Lorem ipsum is a placeholder text commonly used in publishing and
              graphic design
            </p>
          </div>
        </div>

        <div className="bg-orange-300 w-[23rem] rounded-md shadow-md overflow-hidden">
          <img
            className=" w-full h-[18rem] object-cover rounded-md transform transition duration-600 hover:scale-105"
            src="https://images.pexels.com/photos/18114939/pexels-photo-18114939/free-photo-of-louvre-museum-in-paris.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
          />
          <div className="p-4">
            <p>
              Lorem ipsum is a placeholder text commonly used in publishing and
              graphic design
            </p>
          </div>
        </div>

        <div className="bg-orange-300 w-[23rem] rounded-md shadow-md overflow-hidden">
          <img
            className=" w-[23rem] h-[18rem] object-cover rounded-md transform transition duration-600 hover:scale-105"
            src="https://images.pexels.com/photos/12887621/pexels-photo-12887621.jpeg?auto=compress&cs=tinysrgb&w=400&lazy=load"
            alt=""
          />
          <div className="p-4">
            <p>
              Lorem ipsum is a placeholder text commonly used in publishing and
              graphic design
            </p>
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default TripContent;
