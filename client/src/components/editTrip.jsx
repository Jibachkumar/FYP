import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

function TripContent() {
  //const [data, setdata] = useState(null);
  const tripData = useSelector((state) => state.trip.tripData.tripData);
  // console.log("Full Redux State:",JSON.stringify(useSelector((state) => state.trip),   null,2));
  // console.log(JSON.stringify(tripData, null, 2));
  console.log(tripData);
  console.log(tripData.data);
  console.log(tripData?.success);

  useEffect(() => {
    if (!tripData) return;
    // setdata(tripData);
    console.log(tripData);
  }, [tripData]);

  return (
    <div className=" mt-[3rem]  w-full h-full">
      {tripData && (
        <div className=" w-full">
          <h2 className="font-serif text-center mt-16 mb-4 text-base font-semibold font-slate-900">
            your selection your details final step
          </h2>
          {/* cards render card */}
          <div className="w-full flex justify-center">
            <div className=" w-[46%] h-[30rem] rounded-md shadow-sm border mr-4">
              <div className="">
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
            <div className="w-[30%] h-[20rem] rounded-md shadow-sm border">
              <h2 className=" font-bold font-serif ml-4 my-2">
                {" "}
                your booking details
              </h2>
              <p>CheckIn: {tripData?.data?.startDate || "Data not found"}</p>
              <p>
                Destination: {tripData?.data?.destination || "data not found"}
              </p>
              <p>Duration: {tripData?.data?.duration} days</p>
              <p>People: {tripData?.data?.people}</p>
              <p>price: {tripData?.data?.price}</p>
            </div>
          </div>

          {/* Render other trip data properties as needed */}
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
